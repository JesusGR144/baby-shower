
// Script para ajustar un objeto o imagen al tamaño de la mesa de trabajo en Illustrator
function ajustarObjetoAMesa() {
    var doc = app.activeDocument;
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    
    // Obtiene los límites del artboard (x1, y1, x2, y2)
    var abBounds = artboard.artboardRect;
    var abWidth = Math.abs(abBounds[2] - abBounds[0]);
    var abHeight = Math.abs(abBounds[1] - abBounds[3]);

    // Verifica si hay al menos un objeto seleccionado
    if (doc.selection.length > 0) {
        var objeto = doc.selection[0]; // Obtiene el primer objeto seleccionado

        // Pregunta al usuario si desea deformar el objeto o mantener la proporción
        var respuesta = confirm("¿Quieres que el objeto se deforme para ajustarse exactamente al espacio de trabajo?");

        // Obtiene los límites del objeto seleccionado
        var objBounds = objeto.geometricBounds;
        var objWidth = Math.abs(objBounds[2] - objBounds[0]);
        var objHeight = Math.abs(objBounds[1] - objBounds[3]);

        if (respuesta) {
            // Deformar objeto: ajustar exactamente al ancho y alto del artboard
            var scaleX = (abWidth / objWidth) * 100;
            var scaleY = (abHeight / objHeight) * 100;
            objeto.resize(scaleX, scaleY);
        } else {
            // Mantener proporción
            var scaleW = (abWidth / objWidth) * 100;
            var scaleH = (abHeight / objHeight) * 100;
            var scale = Math.max(scaleW, scaleH); // Ajusta para cubrir todo el espacio
            objeto.resize(scale, scale);
        }

        // Vuelve a obtener los nuevos límites del objeto después de redimensionar
        var newBounds = objeto.geometricBounds;
        var newWidth = Math.abs(newBounds[2] - newBounds[0]);
        var newHeight = Math.abs(newBounds[1] - newBounds[3]);

        // Centra el objeto en la mesa de trabajo
        var offsetX = abBounds[0] + (abWidth - newWidth) / 2;
        var offsetY = abBounds[1] - (abHeight - newHeight) / 2;

        objeto.position = [offsetX, offsetY];

        alert("Objeto ajustado a la mesa de trabajo correctamente.");
    } else {
        alert("Por favor, selecciona un objeto.");
    }
}

// Ejecuta la función
ajustarObjetoAMesa();
