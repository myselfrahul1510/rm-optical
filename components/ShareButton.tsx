"use client";

type ShareButtonProps = {
  productName: string;
  productUrl: string;
};

export default function ShareButton({
  productName,
  productUrl,
}: ShareButtonProps) {
  async function handleShare() {
    const shareData = {
      title: productName,
      text: `Check out this frame: ${productName}`,
      url: productUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(productUrl);
        alert("✅ Product link copied!");
      }
    } catch (error) {
      console.log("Share cancelled:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="mt-5 flex w-full items-center justify-center rounded-xl border-2 border-[#0A2E73] px-6 py-4 text-lg font-semibold text-[#0A2E73] transition-all duration-300 hover:bg-[rgb(14,95,181)] hover:text-blue"
    style={{backgroundColor:"rgb(25, 202, 218)", marginTop:"1rem", marginBottom:"1rem"}}
    >
      🔗 Share Product
    </button>
  );
}