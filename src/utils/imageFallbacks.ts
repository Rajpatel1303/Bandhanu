export const FALLBACK_BANDHANI_IMAGE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_BANDHANI_IMAGE) {
    target.src = FALLBACK_BANDHANI_IMAGE;
  }
};
