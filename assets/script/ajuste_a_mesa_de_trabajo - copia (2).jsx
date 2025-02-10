// Script para ajustar una imagen al tamaño de la mesa de trabajo en Illustrator
function ajustarImagenAMesa() {
    var doc = app.activeDocument;
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    
    // Obtiene los límites del artboard (x1, y1, x2, y2)
    var abBounds = artboard.artboardRect;
    var abWidth = Math.abs(abBounds[2] - abBounds[0]);
    var abHeight = Math.abs(abBounds[1] - abBounds[3]);

    // Verifica si hay al menos una imagen seleccionada
    if (doc.selection.length > 0 && doc.selection[0].typename === "PlacedItem") {
        var imagen = doc.selection[0];

        // Pregunta al usuario si desea deformar la imagen o mantener la proporción
        var respuesta = confirm("¿Quieres que la imagen se deforme para ajustarse exactamente al espacio de trabajo?");

        if (respuesta) {
            // Deformar imagen: ajustar exactamente al ancho y alto del artboard
            var scaleX = (abWidth / imagen.width) * 100;
            var scaleY = (abHeight / imagen.height) * 100;
            imagen.resize(scaleX, scaleY);
        } else {
            // Mantener proporción
            var scaleW = (abWidth / imagen.width) * 100;
            var scaleH = (abHeight / imagen.height) * 100;
            var scale = Math.max(scaleW, scaleH); // Ajusta para cubrir todo el espacio
            imagen.resize(scale, scale);
        }

        // Centra la imagen en la mesa de trabajo
        var imgBounds = imagen.geometricBounds;
        var imgWidth = Math.abs(imgBounds[2] - imgBounds[0]);
        var imgHeight = Math.abs(imgBounds[1] - imgBounds[3]);

        var offsetX = abBounds[0] + (abWidth - imgWidth) / 2;
        var offsetY = abBounds[1] - (abHeight - imgHeight) / 2;

        imagen.position = [offsetX, offsetY];
        
        alert("Imagen ajustada a la mesa de trabajo correctamente.");
    } else {
        alert("Por favor, selecciona una imagen.");
    }
}

// Ejecuta la función
ajustarImagenAMesa();
