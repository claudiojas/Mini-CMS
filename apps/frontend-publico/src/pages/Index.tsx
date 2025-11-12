import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";

// Mock data - Em produção, isso viria de uma API ou CMS
const featuredProduct = {
  title: "Fone de Ouvido TWS Premium",
  image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  platform: "Mercado Livre",
  description: "Som de qualidade profissional com cancelamento de ruído ativo. Bateria de 30h e resistência à água IPX7. Melhor custo-benefício da categoria!",
  link: "https://mercadolivre.com.br",
};

const products = [
  {
    id: "1",
    title: "Smart Watch Fitness com Monitor Cardíaco",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
    platform: "Mercado Livre",
    badge: "Top CB" as const,
    rating: 4.8,
    link: "https://mercadolivre.com.br",
    category: "Tecnologia",
  },
  {
    id: "2",
    title: "Cafeteira Elétrica 12 Xícaras Programável",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80",
    platform: "Shopee",
    badge: "Testado" as const,
    rating: 4.6,
    link: "https://shopee.com.br",
    category: "Casa & Lar",
  },
  {
    id: "3",
    title: "Kit Halteres Ajustáveis 20kg Academia em Casa",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    platform: "Mercado Livre",
    badge: "Promoção" as const,
    rating: 4.7,
    link: "https://mercadolivre.com.br",
    category: "Fitness",
  },
  {
    id: "4",
    title: "Câmera de Segurança Wi-Fi Full HD Noturna",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80",
    platform: "Amazon",
    badge: "Top CB" as const,
    rating: 4.5,
    link: "https://amazon.com.br",
    category: "Tecnologia",
  },
  {
    id: "5",
    title: "Aspirador Robô Inteligente com Mapeamento",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&q=80",
    platform: "Mercado Livre",
    badge: "Testado" as const,
    rating: 4.9,
    link: "https://mercadolivre.com.br",
    category: "Casa & Lar",
  },
  {
    id: "6",
    title: "Tênis de Corrida Profissional Amortecimento Max",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    platform: "Shopee",
    rating: 4.4,
    link: "https://shopee.com.br",
    category: "Fitness",
  },
];

const categories = ["Todos", "Tecnologia", "Casa & Lar", "Fitness"];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Featured Product Section */}
        <section aria-label="Produto em destaque">
          <FeaturedProduct {...featuredProduct} />
        </section>

        {/* Category Filter */}
        <section aria-label="Filtros de categoria">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Products Grid */}
        <section aria-label="Produtos disponíveis">
          <h2 className="text-2xl font-bold mb-6">
            {activeCategory === "Todos" ? "Todos os Produtos" : activeCategory}
          </h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado para "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Compra Esperta. Todos os direitos reservados.</p>
          <p className="mt-2">Reviews honestos e links afiliados para suas melhores compras.</p>
        </div>
      </footer>
    </div>
  );
}
