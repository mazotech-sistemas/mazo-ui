import { test, expect } from "@playwright/test";

const PAPER = "rgb(255, 255, 255)";
const ROYAL = "rgb(0, 82, 250)";

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
    // texto ink sobre fundo mint translucido: mint como texto nao passa em contraste
    await expect(pago).toHaveCSS("color", "rgb(5, 32, 73)");
    for (const tom of ["ok", "go", "warn", "danger", "info", "neutral"]) {
      await expect(page.getByText(tom, { exact: true }).first()).toBeVisible();
    }
  });

  test("contraste: texto de cada badge passa de 4.5:1 sobre o fundo (WCAG AA)", async ({ page }) => {
    await page.goto("/ui");
    const medidas = await page.evaluate(() => {
      const sobreBranco = (css: string) => {
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2]];
      };
      const lum = (rgb: number[]) => {
        const f = (v: number) => {
          const x = v / 255;
          return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
      };
      const secao = [...document.querySelectorAll("section")].find((s) =>
        s.textContent?.includes("Badges por tom"),
      )!;
      return [...secao.querySelectorAll("span")].map((el) => {
        const cs = getComputedStyle(el);
        const a = lum(sobreBranco(cs.color));
        const b = lum(sobreBranco(cs.backgroundColor));
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        return { tom: el.textContent, ratio: Math.round(ratio * 100) / 100 };
      });
    });
    expect(medidas).toHaveLength(6);
    expect(medidas.filter((m) => m.ratio < 4.5)).toEqual([]);
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
