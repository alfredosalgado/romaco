// Sistema de descarga de PDFs - Enfoque directo
console.log('Sistema de descarga de PDFs cargado');

// Mapeo directo de productos a archivos
const PDF_FILES = {
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

// Función para verificar si un archivo existe
async function fileExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.warn(`Error verificando archivo: ${url}`, error);
        return false;
    }
}

// Función para descargar archivo
async function downloadFile(url, filename) {
    console.log(`Intentando descargar: ${url}`);
    
    // Verificar si el archivo existe
    const exists = await fileExists(url);
    if (!exists) {
        console.error(`Archivo no encontrado: ${url}`);
        alert(`Error: No se pudo encontrar el archivo. Verifique que el archivo existe en la ruta: ${url}`);
        return false;
    }
    
    try {
        // Crear elemento de enlace temporal
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || '';
        link.target = '_blank';
        
        // Agregar al DOM temporalmente
        document.body.appendChild(link);
        
        // Hacer clic programáticamente
        link.click();
        
        // Remover del DOM después de un pequeño delay
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
        
        console.log(`Descarga iniciada: ${filename}`);
        return true;
    } catch (error) {
        console.error(`Error en la descarga: ${error}`);
        alert(`Error al iniciar la descarga: ${error.message}`);
        return false;
    }
}

// Función para manejar clics en enlaces de productos
function handleProductClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Clic detectado en enlace de producto');
    
    const link = event.currentTarget;
    const productItem = link.closest('.product-item');
    
    if (!productItem) {
        console.error('No se encontró el elemento producto');
        alert('Error: No se pudo identificar el producto');
        return;
    }
    
    const productNameElement = productItem.querySelector('.product-name');
    if (!productNameElement) {
        console.error('No se encontró el nombre del producto');
        alert('Error: No se pudo identificar el nombre del producto');
        return;
    }
    
    const productName = productNameElement.textContent.trim();
    const linkText = link.textContent.trim();
    
    console.log(`Procesando clic: "${linkText}" para producto: "${productName}"`);
    
    const productData = PDF_FILES[productName];
    if (!productData) {
        console.error(`No se encontraron archivos para el producto: ${productName}`);
        console.log('Productos disponibles:', Object.keys(PDF_FILES));
        alert(`No se encontraron archivos para el producto: ${productName}`);
        return;
    }
    
    let fileUrl = null;
    let fileName = null;
    
    if (linkText.includes('Ficha Técnica') || linkText.includes('Ficha')) {
        if (productData.ficha) {
            fileUrl = productData.ficha;
            fileName = `Ficha_Tecnica_${productName.replace(/\s+/g, '_')}.pdf`;
            console.log(`Descargando ficha técnica: ${fileUrl}`);
        } else {
            alert(`Ficha técnica no disponible para ${productName}`);
            return;
        }
    } else if (linkText.includes('Hoja de Seguridad') || linkText.includes('Hoja')) {
        if (productData.hoja) {
            fileUrl = productData.hoja;
            fileName = `Hoja_Seguridad_${productName.replace(/\s+/g, '_')}.pdf`;
            console.log(`Descargando hoja de seguridad: ${fileUrl}`);
        } else {
            alert(`Hoja de seguridad no disponible para ${productName}`);
            return;
        }
    }
    
    if (fileUrl) {
        // Mostrar indicador de descarga
        link.style.opacity = '0.7';
        link.innerHTML = 'Descargando...';
        
        downloadFile(fileUrl, fileName).then(success => {
            // Restaurar el enlace después de la descarga
            setTimeout(() => {
                link.style.opacity = '1';
                if (linkText.includes('Ficha')) {
                    link.innerHTML = 'Ficha Técnica <i class="fas fa-download"></i>';
                } else {
                    link.innerHTML = 'Hoja de Seguridad <i class="fas fa-download"></i>';
                }
            }, 1000);
        });
    } else {
        console.warn(`Archivo no disponible: ${linkText} para ${productName}`);
        alert(`${linkText} no disponible para ${productName}`);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de descarga...');
    
    // Agregar event listeners a todos los enlaces de productos
    const productLinks = document.querySelectorAll('.product-link');
    console.log(`Encontrados ${productLinks.length} enlaces de productos`);
    
    productLinks.forEach(link => {
        // Remover event listeners existentes
        link.removeEventListener('click', handleProductClick);
        // Agregar nuevo event listener
        link.addEventListener('click', handleProductClick);
        
        // Asegurar que el enlace sea clickeable
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
    });
    
    console.log('Sistema de descarga inicializado correctamente');
});

// Función global para reinicializar (útil para debugging)
window.initDownloadSystem = function() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
};