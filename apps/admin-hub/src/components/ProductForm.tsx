import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/pages/Dashboard";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  product: Product | null;
}

const plataformas = ["Amazon", "Mercado Livre", "Magazine Luiza", "Americanas", "Shopee", "AliExpress"];
const categorias = ["Eletrônicos", "Informática", "Casa", "Moda", "Esportes", "Livros", "Brinquedos", "Beleza"];

const ProductForm = ({ open, onClose, onSave, product }: ProductFormProps) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    titulo_exibicao: "",
    descricao_curta: "",
    url_imagem: "",
    link_afiliado_final: "",
    slug_personalizado: "",
    preco_exibicao: "",
    plataforma: "",
    categoria: "",
    em_destaque: false,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        titulo_exibicao: "",
        descricao_curta: "",
        url_imagem: "",
        link_afiliado_final: "",
        slug_personalizado: "",
        preco_exibicao: "",
        plataforma: "",
        categoria: "",
        em_destaque: false,
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    const newFormData = { ...formData, titulo_exibicao: value };
    if (!product) { // Apenas gera slug para novos produtos
      newFormData.slug_personalizado = generateSlug(value);
    }
    setFormData(newFormData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {product ? "atualizar" : "adicionar"} um produto
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titulo_exibicao">Título de Exibição *</Label>
              <Input
                id="titulo_exibicao"
                value={formData.titulo_exibicao}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preco_exibicao">Preço de Exibição *</Label>
              <Input
                id="preco_exibicao"
                placeholder="R$ 0,00"
                value={formData.preco_exibicao}
                onChange={(e) => setFormData({ ...formData, preco_exibicao: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao_curta">Descrição Curta *</Label>
            <Textarea
              id="descricao_curta"
              rows={2}
              value={formData.descricao_curta}
              onChange={(e) => setFormData({ ...formData, descricao_curta: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url_imagem">URL da Imagem *</Label>
            <Input
              id="url_imagem"
              type="url"
              placeholder="https://..."
              value={formData.url_imagem}
              onChange={(e) => setFormData({ ...formData, url_imagem: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link_afiliado_final">Link de Afiliado Final *</Label>
            <Input
              id="link_afiliado_final"
              type="url"
              placeholder="https://..."
              value={formData.link_afiliado_final}
              onChange={(e) => setFormData({ ...formData, link_afiliado_final: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug_personalizado">Slug Personalizado *</Label>
            <Input
              id="slug_personalizado"
              placeholder="produto-exemplo"
              value={formData.slug_personalizado}
              onChange={(e) => setFormData({ ...formData, slug_personalizado: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
              required
            />
            <p className="text-xs text-muted-foreground">Apenas letras minúsculas, números e hífens</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="plataforma">Plataforma *</Label>
              <Select
                value={formData.plataforma}
                onValueChange={(value) => setFormData({ ...formData, plataforma: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a plataforma" />
                </SelectTrigger>
                <SelectContent>
                  {plataformas.map((plat) => (
                    <SelectItem key={plat} value={plat}>
                      {plat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData({ ...formData, categoria: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="em_destaque"
              checked={formData.em_destaque}
              onCheckedChange={(checked) => setFormData({ ...formData, em_destaque: checked })}
            />
            <Label htmlFor="em_destaque" className="cursor-pointer">
              Marcar como Destaque
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Produto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
