type CategoryMenu = 'entradas' | 'pratosPrincipais' | 'sobremesas' | 'bebidas'

interface CategoryMenuProps {
  category: CategoryMenu
}

const categoryMenuMap: Record<CategoryMenu, string> = {
  entradas: 'Entradas',
  pratosPrincipais: 'Pratos principais',
  sobremesas: 'Sobremesas',
  bebidas: 'Bebidas',
}

export function CategoryMenu({ category }: CategoryMenuProps) {
  return (
    <div>
      {category === 'entradas' && (
        <span className="bg-blue-300 rounded-sm"></span>
      )}

      {category === 'pratosPrincipais' && (
        <span className="bg-green-300 rounded-sm"></span>
      )}

      {category === 'sobremesas' && (
        <span className="bg-yellow-300 rounded-sm"></span>
      )}

      {category === 'bebidas' && (
        <span className="bg-red-300 rounded-sm"></span>
      )}
      <span className="font-bold text-sm"> {categoryMenuMap[category]}</span>
    </div>
  )
}
