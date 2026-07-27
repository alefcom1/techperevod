/**
 * Самохостинг шрифтов через next/font/google: файлы скачиваются на этапе
 * сборки и раздаются с нашего домена, поэтому в браузере нет отдельного
 * похода на fonts.googleapis.com/fonts.gstatic.com (это было главным
 * блокирующим первую отрисовку ресурсом — см. PageSpeed Insights).
 * Variable-шрифты (без фиксированного `weight`) — один файл покрывает
 * весь диапазон начертаний вместо пяти статических файлов.
 */
import { Inter, JetBrains_Mono } from "next/font/google";

// next/font анализирует аргументы статически на этапе сборки — списки
// подмножеств должны быть литералами прямо в вызове (без общей константы).
// cyrillic-ext — украинские/болгарские буквы (і, ї, є, ґ) в текстах языковых
// страниц; vietnamese — диакритика в примерах вьетнамского письма.
export const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
