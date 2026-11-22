export default async function consoleLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <form action="/api/console/login" method="post" className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8">
        <h1 className="text-xl font-semibold text-fg">KelzStudio Console</h1>
        <label className="mt-6 block text-sm text-muted">Password
          <input type="password" name="password" required autoFocus autoComplete="current-password" className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-fg" /></label>
        {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">Incorrect password.</p>}
        <button className="btn-primary mt-6 w-full">Sign in</button>
      </form>
    </div>);
}