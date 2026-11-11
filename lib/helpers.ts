import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(input: string): string {
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const mascotNames = ["ryu", "daisy", "chilli", "bud"] as const

export const MASCOT_AVATAR_PREFIX = "/mascot/"
export const PREDEFINED_AVATARS = mascotNames.map((name) => `${MASCOT_AVATAR_PREFIX}${name}.webp`)

export function getAvatarImageSrc(avatar: string): string {
  if (avatar.startsWith("/images/")) {
    return avatar
  }
  const normalized = avatar.replace(/\.(png|webp)$/i, "")
  const name = normalized.startsWith(MASCOT_AVATAR_PREFIX)
    ? normalized.slice(MASCOT_AVATAR_PREFIX.length)
    : ""
  if (!(mascotNames as readonly string[]).includes(name)) {
    return `${MASCOT_AVATAR_PREFIX}bud.webp`
  }
  return `${MASCOT_AVATAR_PREFIX}${name}.webp`
}
