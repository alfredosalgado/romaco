// Script para actualizar todos los enlaces de productos
function updateProductLinks() {
  console.log('Actualizando enlaces de productos...');
  
  // Mapeo de productos a nombres de archivos (fichas técnicas y hojas de seguridad)
  const productFiles = {
    'RAPIDROM': {
      ficha: 'pdfs/FICHAS-TECNICAS/ACELERANTE-DE-FRAGUADO/RAPIDROM.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS RAPIDROM.pdf'
    },
    'ECO DESMOL': {
      ficha: 'pdfs/FICHAS-TECNICAS/DESMOLDANTES/ECO-DESMOL.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ECO DESMOL.pdf'
    },
    'DESMOLROM METAL': {
      ficha: 'pdfs/FICHAS-TECNICAS/DESMOLDANTES/DESMOLROM-METAL.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS DESMOLROM METAL.pdf'
    },
    'DESMOLROM MADERA': {
      ficha: 'pdfs/FICHAS-TECNICAS/DESMOLDANTES/DESMOLROM-MADERA.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS DESMOLROM MADERA.pdf'
    },
    'ROMA FUGO': {
      ficha: 'pdfs/FICHAS-TECNICAS/IMPERMEABILIZANTE/ROMA-FUGO.pdf',
      hoja: null
    },
    'ROMA ONE': {
      ficha: 'pdfs/FICHAS-TECNICAS/IMPERMEABILIZANTE/ROMA-ONE.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMA ONE.pdf'
    },
    'ROMATEX FLEX': {
      ficha: 'pdfs/FICHAS-TECNICAS/IMPERMEABILIZANTE/ROMATEX-FLEX.pdf',
      hoja: null
    },
    'AQUA CURE': {
      ficha: 'pdfs/FICHAS-TECNICAS/MEMBRANA-DE-CURADO/AQUA-CURE.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS AQUA CURE.pdf'
    },
    'SOLCURE AMBAR': {
      ficha: 'pdfs/FICHAS-TECNICAS/MEMBRANA-DE-CURADO/SOLCURE-AMBAR.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS SOLCURE ÁMBAR.pdf'
    },
    'ROMATOP FLEX': {
      ficha: 'pdfs/FICHAS-TECNICAS/POLVOS/ROMATOP-FLEX.pdf',
      hoja: null
    },
    'ROMATOP SEAL': {
      ficha: 'pdfs/FICHAS-TECNICAS/POLVOS/ROMATOP-SEAL.pdf',
      hoja: null
    },
    'ANTIPOLUROM': {
      ficha: 'pdfs/FICHAS-TECNICAS/PRODUCTOS-PARA-PISOS/ANTIPOLUROM.pdf',
      hoja: null
    },
    'ROMAFLOOR S GRIS': {
      ficha: 'pdfs/FICHAS-TECNICAS/PRODUCTOS-PARA-PISOS/ROMAFLOOR-S-GRIS.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMAFLOOR S GRIS.pdf'
    },
    'ROMAFLOOR S INCOLORO': {
      ficha: 'pdfs/FICHAS-TECNICAS/PRODUCTOS-PARA-PISOS/ROMAFLOOR-S-INCOLORO.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMAFLOOR S INCOLORO.pdf'
    },
    'ROMA YESO': {
      ficha: 'pdfs/FICHAS-TECNICAS/PROMOTOR-DE-YESO/ROMA-YESO.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMA YESO.pdf'
    },
    'ROMA TECNOYESO': {
      ficha: 'pdfs/FICHAS-TECNICAS/PROMOTOR-DE-YESO/ROMA-TECNOYESO.pdf',
      hoja: null
    },
    'ROMA LATEX LISTO': {
      ficha: 'pdfs/FICHAS-TECNICAS/PROMOTOR-ESTUCO/ROMA-LATEX-LISTO.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMA LATEX LISTO.pdf'
    },
    'ROMA LATEX': {
      ficha: 'pdfs/FICHAS-TECNICAS/PROMOTOR-ESTUCO/ROMA-LATEX.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMA LATEX.pdf'
    },
    'ROMGOSO': {
      ficha: 'pdfs/FICHAS-TECNICAS/RETARDADORES-DE-FRAGUADO/ROMGOSO.pdf',
      hoja: 'pdfs/HOJAS SEGURIDAD/HDS ROMGOSO.pdf'
    }
  };

  // Función para actualizar enlaces de un elemento
  function updateItemLinks(item) {
    const productNameElement = item.querySelector('.product-name');
    if (!productNameElement) return;
    
    const productName = productNameElement.textContent.trim();
    const links = item.querySelectorAll('.product-link');

    if (productFiles[productName]) {
      const productData = productFiles[productName];
      console.log(`Actualizando enlaces para: ${productName}`);

      links.forEach(link => {
        // Skip if already updated (check if href doesn't contain # or is empty)
        if (link.href && !link.href.includes('#') && link.href !== window.location.href + '#') return;
        
        const linkText = link.textContent.trim();

        if (linkText.includes('Ficha Técnica') && productData.ficha) {
          link.href = productData.ficha;
          link.innerHTML = `Ficha Técnica <i class="fas fa-download download-icon"></i>`;
          link.setAttribute('download', '');
          link.setAttribute('target', '_blank');
          link.style.pointerEvents = 'auto';
          link.style.opacity = '1';
          console.log(`  - Ficha técnica: ${productData.ficha}`);
        } else if (linkText.includes('Hoja de Seguridad') && productData.hoja) {
          link.href = productData.hoja;
          link.innerHTML = `Hoja de Seguridad <i class="fas fa-download download-icon"></i>`;
          link.setAttribute('download', '');
          link.setAttribute('target', '_blank');
          link.style.pointerEvents = 'auto';
          link.style.opacity = '1';
          console.log(`  - Hoja de seguridad: ${productData.hoja}`);
        } else if (linkText.includes('Hoja de Seguridad') && !productData.hoja) {
          // Si no hay hoja de seguridad disponible, deshabilitar el enlace
          link.style.opacity = '0.5';
          link.style.pointerEvents = 'none';
          link.title = 'Hoja de seguridad no disponible';
          console.log(`  - Hoja de seguridad no disponible para ${productName}`);
        }
      });
    }
  }

  // Actualizar todos los enlaces de productos existentes
  const productItems = document.querySelectorAll('.product-item');
  console.log(`Encontrados ${productItems.length} productos`);
  
  productItems.forEach(updateItemLinks);

  // También observar cambios en el DOM para productos que se crean dinámicamente
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element node
          if (node.classList && node.classList.contains('product-item')) {
            updateItemLinks(node);
          }
          // También buscar dentro del nodo agregado
          const newItems = node.querySelectorAll && node.querySelectorAll('.product-item');
          if (newItems) {
            newItems.forEach(updateItemLinks);
          }
        }
      });
    });
  });

  // Observar cambios en el contenedor de productos
  const productsContainer = document.querySelector('.products');
  if (productsContainer) {
    observer.observe(productsContainer, {
      childList: true,
      subtree: true
    });
  }
}

// Función para forzar la actualización de todos los enlaces
function forceUpdateAllLinks() {
  console.log('Forzando actualización de todos los enlaces...');
  
  // Buscar todos los enlaces que apuntan a # o están vacíos
  const allLinks = document.querySelectorAll('.product-link');
  console.log(`Encontrados ${allLinks.length} enlaces de productos`);
  
  allLinks.forEach(link => {
    // Resetear el href para forzar la actualización
    if (link.href.includes('#') || link.href === '' || link.href === window.location.href) {
      link.href = '#';
    }
  });
  
  // Ejecutar la actualización
  updateProductLinks();
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM cargado, iniciando actualización de enlaces...');
  
  // Ejecutar inmediatamente
  updateProductLinks();
  
  // También ejecutar después de delays para asegurar que los productos desplegables estén listos
  setTimeout(updateProductLinks, 500);
  setTimeout(updateProductLinks, 1500);
  setTimeout(forceUpdateAllLinks, 3000);
  
  // Agregar un botón de debug para probar manualmente (solo en desarrollo)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug: Actualizar Enlaces';
    debugButton.style.position = 'fixed';
    debugButton.style.top = '10px';
    debugButton.style.right = '10px';
    debugButton.style.zIndex = '9999';
    debugButton.style.backgroundColor = '#007bff';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.padding = '10px';
    debugButton.style.borderRadius = '5px';
    debugButton.onclick = forceUpdateAllLinks;
    document.body.appendChild(debugButton);
  }
});

// Hacer las funciones disponibles globalmente
window.updateProductLinks = updateProductLinks;
window.forceUpdateAllLinks = forceUpdateAllLinks;