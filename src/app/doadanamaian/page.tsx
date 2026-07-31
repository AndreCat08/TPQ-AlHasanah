export default function DoaSection({ doas }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Doa Harian</h2>
      <div className="space-y-6">
        {doas.map((doa, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-medium">{doa.title}</h3>
            <p className="text-gray-700">{doa.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}