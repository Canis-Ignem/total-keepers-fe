import { useState } from "react";

interface CatalogFilterProps {
  tags: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  onChange: (filters: {
    priceRange: [number, number];
    tag: string | null;
    tags: string[];
    sizes: string[];
  }) => void;
}

export default function CatalogFilter({ tags, sizes, minPrice, maxPrice, onChange }: CatalogFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    onChange({ priceRange, tag, tags: selectedTags, sizes: selectedSizes });
  };

  const handleTagsChange = (tag: string) => {
    let updatedTags: string[];
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter(t => t !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
    setSelectedTags(updatedTags);
    onChange({ priceRange, tag: selectedTag, tags: updatedTags, sizes: selectedSizes });
  };

  const handleSizesChange = (size: string) => {
    let updatedSizes: string[];
    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter(s => s !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }
    setSelectedSizes(updatedSizes);
    onChange({ priceRange, tag: selectedTag, tags: selectedTags, sizes: updatedSizes });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, idx: 0 | 1) => {
    const value = Number(e.target.value);
    const newRange: [number, number] = idx === 0 ? [value, priceRange[1]] : [priceRange[0], value];
    setPriceRange(newRange);
    onChange({ priceRange: newRange, tag: selectedTag, tags: selectedTags, sizes: selectedSizes });
  };

  return (
    <aside className="w-full max-w-xs p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-8 sticky top-8 h-fit">
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-900">Precio</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={minPrice}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={e => handlePriceChange(e, 0)}
            className="w-24 border-2 border-blue-500 bg-blue-50 rounded px-3 py-2 text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="mx-1 font-bold text-gray-700 text-lg">-</span>
          <input
            type="number"
            min={priceRange[0]}
            max={maxPrice}
            value={priceRange[1]}
            onChange={e => handlePriceChange(e, 1)}
            className="w-24 border-2 border-blue-500 bg-blue-50 rounded px-3 py-2 text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">Tag principal</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${selectedTag === null ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-100'}`}
            onClick={() => handleTagChange(null)}
          >
            Todos
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${selectedTag === tag ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-100'}`}
              onClick={() => handleTagChange(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <label key={tag} className="flex items-center gap-1 text-xs font-medium text-gray-700">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagsChange(tag)}
                className="accent-blue-600 focus:ring-blue-400"
              />
              <span>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">Tallas</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center gap-1 text-xs font-medium text-gray-700">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizesChange(size)}
                className="accent-blue-600 focus:ring-blue-400"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
