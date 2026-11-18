import { test, expect } from "@playwright/test";

const PAPER = "rgb(255, 255, 255)";
const ROYAL = "rgb(0, 82, 250)";
const MINT = "rgb(0, 222, 178)";

test.describe("demo do @mazotech/ui", () => {
  test("mostra a marca: simbolo Mazotech e nome do produto na sidebar", async ({ page }) => {
    await page.goto("/ui");
    const sidebar = page.locator("aside");
    await expect(sidebar.locator("svg[aria-label='Mazotech']")).toBeVisible();
    await expect(sidebar.getByText("mazo-demo")).toBeVisible();
  });

  test("base clara: body e sidebar em paper, sem dark total", async ({ page }) => {
    await page.goto("/ui");
    await expect(page.locator("aside")).toHaveCSS("background-color", PAPER);
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const scheme = await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);
    expect([PAPER, "rgba(0, 0, 0, 0)"]).toContain(bg);
    expect(scheme).toBe("light");
  });

  test("botao primario e pill royal", async ({ page }) => {
    await page.goto("/ui");
    const btn = page.getByRole("button", { name: "Criar novo" });
    await expect(btn).toHaveCSS("background-color", ROYAL);
    const radius = await btn.evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius));
    expect(radius).toBeGreaterThanOrEqual(1000);
  });

  test("numero heroi em mono tabular, com a fonte JetBrains carregada", async ({ page }) => {
    await page.goto("/ui");
    const valor = page.getByText("2.431");
    const fam = await valor.evaluate((el) => getComputedStyle(el).fontFamily);
    expect(fam).toContain("JetBrains Mono Variable");
    expect(await valor.evaluate((el) => getComputedStyle(el).fontVariantNumeric)).toContain("tabular-nums");
    const carregou = await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check('16px "JetBrains Mono Variable"');
    });
    expect(carregou).toBe(true);
  });

  test("titulo usa Inter Variable carregada", async ({ page }) => {
    await page.goto("/ui");
    const h1 = page.getByRole("heading", { level: 1 });
    expect(await h1.evaluate((el) => getComputedStyle(el).fontFamily)).toContain("Inter Variable");
    const carregou = await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check('16px "Inter Variable"');
    });
    expect(carregou).toBe(true);
  });

  test("badge pago usa o mint e cada tom aparece", async ({ page }) => {
    await page.goto("/ui");
    const pago = page.getByRole("cell").getByText("pago", { exact: true });
    await expect(pago).toHaveCSS("color", MINT);
    for (const tom of ["ok", "go", "warn", "danger", "info", "neutral"]) {
      await expect(page.getByText(tom, { exact: true }).first()).toBeVisible();
    }
  });

  test("remap shadcn: bg-primary vira royal e bg-destructive o vermelho de status", async ({ page }) => {
    await page.goto("/ui");
    await expect(page.getByTestId("shadcn-primary")).toHaveCSS("background-color", ROYAL);
    await expect(page.getByTestId("shadcn-destructive")).toHaveCSS("background-color", "rgb(190, 18, 60)");
  });

  test("sem erro nem warning de console ao carregar", async ({ page }) => {
    const ruins: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") ruins.push(m.text());
    });
    page.on("pageerror", (e) => ruins.push(String(e)));
    await page.goto("/ui");
    await page.waitForLoadState("networkidle");
    expect(ruins).toEqual([]);
  });
});
