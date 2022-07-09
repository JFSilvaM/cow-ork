export default function ErrorPage({ image, children }) {
  return (
    <section className="flex w-full flex-col items-center justify-center space-y-6">
      <img src={`/images/${image}`} alt="Error page" />

      {children}
    </section>
  );
}
