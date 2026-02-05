interface ServiceDetailPageProps {
  params: Promise<{ service: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // Await params in Next.js 15+
  const { service } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 capitalize">
          {service.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600">
          Detail page for {service}
        </p>
        {/* Add your service detail content here */}
      </div>
    </div>
  );
}
