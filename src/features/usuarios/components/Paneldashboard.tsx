export default function AdminDashboard () {
    return (
        <main className="min-h-[calc(100vh-128px)] bg-gray-100 px-6 py-8">
            <section className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tarjeta de Usuarios */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Usuarios</h2>
                        <p className="text-sm text-gray-500 mb-4">Gestiona usuarios registrados, roles y permisos.</p>
                        <button className="text-blue-600 hover:underline text-sm">Ver detalles</button>
                    </div>

                    {/* Tarjeta de Pedidos */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Pedidos</h2>
                        <p className="text-sm text-gray-500 mb-4">Revisa el estado de pedidos y actualiza entregas.</p>
                        <button className="text-blue-600 hover:underline text-sm">Ver detalles</button>
                    </div>

                    {/* Tarjeta de Productos */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Productos</h2>
                        <p className="text-sm text-gray-500 mb-4">Agrega, edita o elimina productos del catálogo.</p>
                        <button className="text-blue-600 hover:underline text-sm">Ver detalles</button>
                    </div>

                    {/* Tarjeta de Finanzas */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Finanzas</h2>
                        <p className="text-sm text-gray-500 mb-4">Visualiza métricas, ingresos y costos operativos.</p>
                        <button className="text-blue-600 hover:underline text-sm">Ver detalles</button>
                    </div>

                    {/* Tarjeta de Configuración */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Configuración</h2>
                        <p className="text-sm text-gray-500 mb-4">Ajusta parámetros del sistema y preferencias.</p>
                        <button className="text-blue-600 hover:underline text-sm">Ver detalles</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
