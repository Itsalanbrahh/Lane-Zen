from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from pathlib import Path
import os
from statsmodels.tsa.statespace.sarimax import SARIMAX
import xgboost as xgb
from neuralprophet import NeuralProphet

app = FastAPI(title="Freight Forecasting API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/api/upload/{file_type}")
async def upload_file(file_type: str, file: UploadFile = File(...)):
    """Handle file uploads for bid, historical, and market data."""
    try:
        file_path = UPLOAD_DIR / f"{file_type}_{file.filename}"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        return {"filename": file.filename, "status": "success"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/historical-analysis")
async def analyze_historical_data():
    """Process historical lane data and return analysis results."""
    try:
        # Load historical data
        historical_files = list(UPLOAD_DIR.glob("historical_*.csv"))
        if not historical_files:
            return {"error": "No historical data found"}
        
        df = pd.read_csv(historical_files[0])
        
        # Basic analysis (to be expanded)
        analysis = {
            "total_lanes": len(df),
            "average_rate": float(df["rate"].mean()) if "rate" in df.columns else 0,
            "monthly_trends": df.groupby("month")["rate"].mean().to_dict() if "month" in df.columns else {}
        }
        return analysis
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/forecast/{lane_id}")
async def forecast_lane(lane_id: str):
    """Generate forecasts using multiple models for a specific lane."""
    try:
        # Load historical data
        historical_files = list(UPLOAD_DIR.glob("historical_*.csv"))
        if not historical_files:
            return {"error": "No historical data found"}
        
        df = pd.read_csv(historical_files[0])
        lane_data = df[df['lane_id'] == lane_id]
        if lane_data.empty:
            return {"error": "No data found for the specified lane"}

        # Prepare data for forecasting
        lane_data['date'] = pd.to_datetime(lane_data['date'])
        lane_data.set_index('date', inplace=True)
        y = lane_data['rate']

        # SARIMAX model
        sarimax_model = SARIMAX(y, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
        sarimax_fit = sarimax_model.fit(disp=False)
        sarimax_forecast = sarimax_fit.forecast(steps=12)

        # XGBoost model
        xgb_model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100)
        xgb_model.fit(np.arange(len(y)).reshape(-1, 1), y)
        xgb_forecast = xgb_model.predict(np.arange(len(y), len(y) + 12).reshape(-1, 1))

        # Neural Prophet model
        prophet_model = NeuralProphet()
        prophet_df = lane_data.reset_index().rename(columns={'date': 'ds', 'rate': 'y'})
        prophet_model.fit(prophet_df, freq='M')
        future = prophet_model.make_future_dataframe(prophet_df, periods=12)
        forecast = prophet_model.predict(future)
        neural_prophet_forecast = forecast['yhat1'].tail(12).values

        forecast_data = {
            "sarimax": {
                "dates": sarimax_forecast.index.strftime("%Y-%m-%d").tolist(),
                "values": sarimax_forecast.tolist()
            },
            "xgboost": {
                "dates": pd.date_range(start=y.index[-1] + pd.DateOffset(months=1), periods=12, freq='M').strftime("%Y-%m-%d").tolist(),
                "values": xgb_forecast.tolist()
            },
            "neural_prophet": {
                "dates": pd.date_range(start=y.index[-1] + pd.DateOffset(months=1), periods=12, freq='M').strftime("%Y-%m-%d").tolist(),
                "values": neural_prophet_forecast.tolist()
            }
        }
        return forecast_data
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 