"use server";

import { redirect } from "next/navigation";
import { getContent, saveContent } from "../../lib/content";
import { createSession, destroySession, isAuthenticated, verifyPassword } from "../../lib/auth";

export async function loginAction(formData) {
  const password = formData.get("password");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  createSession();
  redirect("/admin");
}

export async function logoutAction() {
  destroySession();
  redirect("/admin/login");
}

function linesToArray(value) {
  return (value || "")
    .toString()
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveContentAction(formData) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const get = (key) => (formData.get(key) || "").toString().trim();

  const current = await getContent();

  const stores = [];
  for (let i = 1; i <= 4; i++) {
    const name = get(`home_store${i}_name`);
    const address = get(`home_store${i}_address`);
    if (name) stores.push({ name, address });
  }

  const events = [];
  for (let i = 1; i <= 6; i++) {
    const date = get(`home_event${i}_date`);
    const name = get(`home_event${i}_name`);
    const place = get(`home_event${i}_place`);
    if (name) events.push({ date, name, place });
  }

  const recipes = [];
  for (let i = 1; i <= 2; i++) {
    const title = get(`recipe_r${i}_title`);
    if (!title) continue;

    const groups = [];
    const group1Items = linesToArray(get(`recipe_r${i}_group1Items`));
    if (group1Items.length) {
      groups.push({ label: get(`recipe_r${i}_group1Label`), items: group1Items });
    }
    const group2Items = linesToArray(get(`recipe_r${i}_group2Items`));
    if (group2Items.length) {
      groups.push({ label: get(`recipe_r${i}_group2Label`), items: group2Items });
    }

    recipes.push({
      photo: get(`recipe_r${i}_photo`) || current.recipe.recipes[i - 1]?.photo || "",
      title,
      lead: get(`recipe_r${i}_lead`),
      ingredientsLabel: get(`recipe_r${i}_ingredientsLabel`),
      ingredientGroups: groups,
      steps: linesToArray(get(`recipe_r${i}_steps`)),
      tipLabel: get(`recipe_r${i}_tipLabel`),
      tip: get(`recipe_r${i}_tip`),
      closing: get(`recipe_r${i}_closing`),
    });
  }

  const content = {
    home: {
      titleLine1: get("home_titleLine1"),
      titleLine2: get("home_titleLine2"),
      intro: [get("home_intro1"), get("home_intro2")].filter(Boolean),
      about: [get("home_about1"), get("home_about2")].filter(Boolean),
      product: {
        amount: get("home_productAmount"),
        storage: get("home_productStorage"),
      },
      stores,
      events,
    },
    recipe: {
      titleLines: [get("recipe_titleLine1"), get("recipe_titleLine2"), get("recipe_titleLine3")].filter(
        Boolean
      ),
      intro: get("recipe_intro"),
      recipes,
    },
  };

  await saveContent(content);
  redirect("/admin?saved=1");
}
