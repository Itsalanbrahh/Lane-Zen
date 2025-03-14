import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as config from '../../lib/config';

/**
 * Configuration Debug Page
 * 
 * This page displays all configuration values for debugging purposes.
 * Only available in development and QA environments.
 */
export default function ConfigDebugPage() {
  // Prevent access in production
  if (config.IS_PRODUCTION && process.env.NODE_ENV === 'production') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-600">This page is not available in production.</p>
          <Link href="/">
            <a className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white">
              Go Home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // Format config values for display
  const configEntries = Object.entries(config).filter(
    ([key, value]) => typeof value !== 'function'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Config Debug - Lane Zen</title>
      </Head>

      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Configuration Debug</h1>
        <p className="text-gray-600">
          Current environment: <span className="font-semibold">{config.ENVIRONMENT}</span>
        </p>
        <div className="mt-4">
          <Link href="/">
            <a className="text-blue-600 hover:underline">← Back to Home</a>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Configuration Key
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {configEntries.map(([key, value]) => (
              <tr key={key}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {key}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {value === undefined
                    ? '<undefined>'
                    : value === null
                    ? '<null>'
                    : value === ''
                    ? '<empty string>'
                    : typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {typeof value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Environment Variables</h2>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(
              Object.keys(process.env)
                .filter(key => key.startsWith('NEXT_PUBLIC_'))
                .reduce((obj, key) => {
                  obj[key] = process.env[key];
                  return obj;
                }, {}),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
} 