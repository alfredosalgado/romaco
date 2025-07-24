// Script para actualizar todos los enlaces de productos
document.addEventListener('DOMContentLoaded', function () {
  // Mapeo de productos a nombres de archivos
  const productFiles = {
    'RAPIDROM SC': 'rapidrom-sc',
    'RAPIDROM': 'rapidrom',
    'ROMA 5': 'roma-5',
    'ECO DESMOL': 'eco-desmol',
    'DESMOLROM METAL': 'desmolrom-metal',
    'DESMOLROM MADERA': 'desmolrom-madera',
    'ROMA FUGO': 'roma-fugo',
    'ROMA ONE': 'roma-one',
    'ROMA FLEX': 'roma-flex',
    'ROMATEX FLEX': 'romatex-flex',
    'AQUA CURE': 'aqua-cure',
    'SOLCURE AMBAR': 'solcure-ambar',
    'SOLCURE BLANCA': 'solcure-blanca',
    'ROMATOP FLEX': 'romatop-flex',
    'ROMATOP SEAL': 'romatop-seal',
    'ANTIPOLUROM': 'antipolurom',
    'ROMAFLOOR A': 'romafloor-a',
    'ROMAFLOOR S (Blanca, Gris, Incoloro)': 'romafloor-s',
    'ROMA YESO': 'roma-yeso',
    'ROMA TECNOYESO': 'roma-tecnoyeso',
    'YESO MIX': 'yeso-mix',
    'ROMA LATEX LISTO': 'roma-latex-listo',
    'ROMA LATEX': 'roma-latex',
    'ROMGOSO': 'romgoso'
  };

  // Actualizar todos los enlaces de productos
  const productItems = document.querySelectorAll('.product-item');

  productItems.forEach(item => {
    const productName = item.querySelector('.product-name').textContent.trim();
    const links = item.querySelectorAll('.product-link');

    if (productFiles[productName]) {
      const fileName = productFiles[productName];

      links.forEach(link => {
        const linkText = link.textContent.trim();

        if (linkText.includes('Ficha Técnica')) {
          link.href = `pdfs/${fileName}-ficha-tecnica.pdf`;
          link.innerHTML = `Ficha Técnica <i class="fas fa-download download-icon"></i>`;
          link.setAttribute('download', '');
        } else if (linkText.includes('Hoja de Seguridad')) {
          link.href = `pdfs/${fileName}-hoja-seguridad.pdf`;
          link.innerHTML = `Hoja de Seguridad <i class="fas fa-download download-icon"></i>`;
          link.setAttribute('download', '');
        }
      });
    }
  });
});