import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package, TrendingUp, LogOut } from "lucide-react";
import ProductTable from "@/components/ProductTable";
import ProductForm from "@/components/ProductForm";
import { toast } from "sonner";

export interface Product {
  id?: number;
  titulo_exibicao: string;
  descricao_curta: string;
  url_imagem: string;
  link_afiliado_final: string;
  slug_personalizado: string;
  preco_exibicao: string;
  plataforma: string;
  categoria: string;
  em_destaque: boolean;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Simulação de carregamento de dados (substituir por chamada à API)
    const mockData: Product[] = [
      {
        id: 1,
        titulo_exibicao: "Notebook Dell Inspiron",
        descricao_curta: "Intel Core i5, 8GB RAM, SSD 256GB",
        url_imagem: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
        link_afiliado_final: "https://amzn.to/example1",
        slug_personalizado: "notebook-dell-inspiron",
        preco_exibicao: "R$ 3.499,00",
        plataforma: "Amazon",
        categoria: "Informática",
        em_destaque: true,
      },
      {
        id: 2,
        titulo_exibicao: "Fone Bluetooth Sony",
        descricao_curta: "Cancelamento de ruído ativo, 30h de bateria",
        url_imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        link_afiliado_final: "https://amzn.to/example2",
        slug_personalizado: "fone-sony-bluetooth",
        preco_exibicao: "R$ 899,00",
        plataforma: "Mercado Livre",
        categoria: "Eletrônicos",
        em_destaque: false,
      },
    ];
    setProducts(mockData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    toast.success("Logout realizado");
    navigate("/login");
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Produto excluído com sucesso!");
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p));
      toast.success("Produto atualizado com sucesso!");
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
      toast.success("Produto adicionado com sucesso!");
    }
    setIsFormOpen(false);
  };

  const activeProducts = products.length;
  const featuredProducts = products.filter(p => p.em_destaque).length;
  const lastProduct = products[products.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Compra Esperta</h1>
            <p className="text-sm text-muted-foreground">Painel Administrativo</p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProducts}</div>
              <p className="text-xs text-muted-foreground">Total no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Destaque</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredProducts}</div>
              <p className="text-xs text-muted-foreground">Produtos destacados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Último Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">
                {lastProduct?.titulo_exibicao || "Nenhum produto"}
              </div>
              <p className="text-xs text-muted-foreground">Adicionado recentemente</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gerenciar Produtos</CardTitle>
                <CardDescription>Lista completa de produtos cadastrados</CardDescription>
              </div>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </CardContent>
        </Card>
      </main>

      <ProductForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default Dashboard;
