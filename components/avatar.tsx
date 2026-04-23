import Image from "next/image";

export function XinnAvatar({ size = 58 }: { size?: number }) {
  return (
    <div className="avatar-wrap" style={{ width: size, height: size }}>
      <div className="avatar-inner">
        <Image src="/xinn-avatar.gif" alt="XINN AI" width={size} height={size} priority />
      </div>
    </div>
  );
}
