const INDUSTRIAL_DESIGN_SKILL = "Industrial Design";

export function getProjectHref(
  slug: string,
  skills?: (string | null | undefined)[] | null,
): string {
  if (skills?.includes(INDUSTRIAL_DESIGN_SKILL)) {
    return `/services/industrial-design/${slug}`;
  }
  return `/work/${slug}`;
}
