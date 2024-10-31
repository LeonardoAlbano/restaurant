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
    <div className="">
      {category === 'entradas' && <span className="bg-blue-300 rounded-sm" />}

      {category === 'pratosPrincipais' && (
        <span className="bg-green-300 rounded-sm" />
      )}

      {category === 'sobremesas' && (
        <span className="bg-yellow-300 rounded-sm" />
      )}

      {category === 'bebidas' && <span className="bg-red-300 rounded-sm" />}

      {['bebidas', 'sobremesas'].includes(category) && (
        <span className="bg-orange-500" />
      )}
      <span className="font-bold text-sm"> {categoryMenuMap[category]} </span>
    </div>
  )
}
