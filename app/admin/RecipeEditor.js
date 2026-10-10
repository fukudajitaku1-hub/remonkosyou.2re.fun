"use client";

import { useState } from "react";

function emptyRecipe() {
  return {
    _key: crypto.randomUUID(),
    photo: "",
    title: "",
    lead: "",
    ingredientsLabel: "材料",
    group1Label: "",
    group1Items: "",
    group2Label: "",
    group2Items: "",
    steps: "",
    tipLabel: "",
    tip: "",
    closing: "",
  };
}

function toEditorRecipe(r) {
  const groups = r.ingredientGroups || [];
  return {
    _key: crypto.randomUUID(),
    photo: r.photo || "",
    title: r.title || "",
    lead: r.lead || "",
    ingredientsLabel: r.ingredientsLabel || "",
    group1Label: groups[0]?.label || "",
    group1Items: (groups[0]?.items || []).join("\n"),
    group2Label: groups[1]?.label || "",
    group2Items: (groups[1]?.items || []).join("\n"),
    steps: (r.steps || []).join("\n"),
    tipLabel: r.tipLabel || "",
    tip: r.tip || "",
    closing: r.closing || "",
  };
}

export default function RecipeEditor({ initialRecipes }) {
  const [recipes, setRecipes] = useState(() =>
    initialRecipes.length ? initialRecipes.map(toEditorRecipe) : [emptyRecipe()]
  );

  const addRecipe = () => setRecipes((prev) => [...prev, emptyRecipe()]);
  const removeRecipe = (key) =>
    setRecipes((prev) => (prev.length > 1 ? prev.filter((r) => r._key !== key) : prev));

  return (
    <>
      {recipes.map((r, idx) => {
        const n = idx + 1;
        return (
          <fieldset className="admin-recipe" key={r._key}>
            <legend>レシピ{n}</legend>

            <input type="hidden" name={`recipe_r${n}_currentPhoto`} value={r.photo} />
            <div className="admin-photo-field">
              {r.photo && <img className="admin-photo-preview" src={r.photo} alt="" />}
              <label>
                写真をアップロード（選択しない場合は現在の写真のまま）
                <input
                  type="file"
                  name={`recipe_r${n}_photoFile`}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                />
              </label>
            </div>

            <label>
              タイトル
              <input name={`recipe_r${n}_title`} defaultValue={r.title} />
            </label>
            <label>
              リード文（任意）
              <textarea name={`recipe_r${n}_lead`} defaultValue={r.lead} />
            </label>
            <label>
              材料見出し
              <input name={`recipe_r${n}_ingredientsLabel`} defaultValue={r.ingredientsLabel} />
            </label>
            <label>
              材料グループ1見出し（任意）
              <input name={`recipe_r${n}_group1Label`} defaultValue={r.group1Label} />
            </label>
            <label>
              材料グループ1（1行に1項目）
              <textarea name={`recipe_r${n}_group1Items`} defaultValue={r.group1Items} />
            </label>
            <label>
              材料グループ2見出し（任意）
              <input name={`recipe_r${n}_group2Label`} defaultValue={r.group2Label} />
            </label>
            <label>
              材料グループ2（1行に1項目、任意）
              <textarea name={`recipe_r${n}_group2Items`} defaultValue={r.group2Items} />
            </label>
            <label>
              作り方（1行に1手順）
              <textarea name={`recipe_r${n}_steps`} defaultValue={r.steps} />
            </label>
            <label>
              ワンポイント見出し
              <input name={`recipe_r${n}_tipLabel`} defaultValue={r.tipLabel} />
            </label>
            <label>
              ワンポイント本文
              <textarea name={`recipe_r${n}_tip`} defaultValue={r.tip} />
            </label>
            <label>
              結びの文（任意）
              <textarea name={`recipe_r${n}_closing`} defaultValue={r.closing} />
            </label>

            <button
              type="button"
              className="admin-remove-recipe"
              onClick={() => removeRecipe(r._key)}
              disabled={recipes.length <= 1}
            >
              このレシピを削除
            </button>
          </fieldset>
        );
      })}

      <button type="button" className="admin-add-recipe" onClick={addRecipe}>
        ＋ レシピを追加
      </button>
    </>
  );
}
