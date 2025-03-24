export default function ForbiddenPage() {
  return (
    <div className="w-full h-screen text-center space-y-2">
      <h1 className="font-black text-[150px]">403</h1>
      <h2 className="font-bold text-3xl text-ellipsis">Forbidden</h2>
      <p className="font-semibold text-xl text-gray-400">Access to this source on the server is denied!</p>
    </div>
  );
}
