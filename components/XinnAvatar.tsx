import Image from 'next/image';

export default function XinnAvatar({ size = 44 }: { size?: number }) {
  return (
    <div
      className="xinn-avatar"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-hidden="true"
    >
      <Image src="/xinn-avatar.svg" alt="XINN avatar" width={size} height={size} priority />
    </div>
  );
}
