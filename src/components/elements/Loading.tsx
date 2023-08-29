import Image from "next/image";

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute h-32 w-32 animate-spin rounded-full border-t-2 border-green-500" />
      <Image
        src="/static/logos/gaia.jpeg"
        width={64}
        height={64}
        alt="Logo do gaia"
        quality={100}
        className="relative"
      />
    </div>
  );
}
