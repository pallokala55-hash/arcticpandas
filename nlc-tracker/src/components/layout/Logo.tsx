/** Simple placeholder mark: rounded square with a panda-ish "N" glyph */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl font-black text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        background: "linear-gradient(135deg, #6C6CF5, #3B2E8C)",
        boxShadow: "0 0 18px rgba(108,108,245,0.45)",
      }}
      aria-hidden="true"
    >
      N
    </div>
  );
}
