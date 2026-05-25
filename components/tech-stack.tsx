'use client'

interface TechStackItem {
  name: string
  category?: string
  iconUrl?: string
}

interface TechStackProps {
  items: TechStackItem[]
}

export function TechStack({ items }: TechStackProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Tech Stack & Frameworks</h2>
          <p className="text-muted-foreground text-md max-w-2xl mx-auto">
            Tools and technologies I work with
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary transition-colors"
            >
              {item.iconUrl ? (
                <img src={item.iconUrl} alt={item.name} className="w-12 h-12" />
              ) : (
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs font-bold">
                  {item.name.slice(0, 2)}
                </div>
              )}
              <div>
                <p className="font-semibold text-xs">{item.name}</p>
                {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
