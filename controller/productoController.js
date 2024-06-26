const Producto = require('../models/M-producto');
const  getNextSequenceValue  = require('../controller/getNextSequenceValue');
const Contador = require('../models/correlativo');

// Validar datos requeridos para las tablas
const validateTablas = (tablas) => {
    const requiredFields = [
        'odEsferico', 'odCilindro', 'odEje', 'odAdicion', 'odDp',
        'osEsferico', 'osCilindro', 'osEje', 'osAdicion', 'osDp'
    ];

    // Verificar que `tablas` sea un array y contenga elementos
    if (!Array.isArray(tablas) || tablas.length === 0) {
        return { isValid: false, field: 'tablas', message: 'No se han proporcionado datos de tablas válidos' };
    }

    // Iterar sobre cada objeto de tabla
    for (const tabla of tablas) {
        // Verificar que cada tabla tenga todos los campos requeridos
        for (const field of requiredFields) {
            if (tabla[field] === undefined || tabla[field] === '') {
                return { isValid: false, field, message: `El campo ${field} es requerido en una tabla` };
            }
        }
    }

    return { isValid: true };
};

// Generar datos de tabla por defecto si no se proporcionan
const generarDatosDeTabla = () => {
    return {
        odEsferico: 0,
        odCilindro: 0,
        odEje: 0,
        odAdicion: 0,
        odDp: 0,
        osEsferico: 0,
        osCilindro: 0,
        osEje: 0,
        osAdicion: 0,
        osDp: 0
    };
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, vendedor, rut, telefono, abono, saldo, fecha, observacion, tipoPago, tablas, precio } = req.body;

        // Verificar que los campos requeridos están presentes y son válidos
        if (!nombre || typeof precio !== 'number') {
            return res.status(400).json({ msg: 'Nombre, precio (número) y tiem (cadena) son campos requeridos y deben tener el tipo correcto' });
        }

        // Validar campos requeridos en las tablas (si es necesario)
        // ...

        const newId = await getNextSequenceValue('productoId');
        const producto = new Producto({
            _id: newId,
            nombre,
            vendedor,
            rut,
            telefono,
            abono,
            saldo,
            fecha,
            observacion,
            tipoPago,
            tablas,
            precio,
        });

        // Guardar el producto en la base de datos
        await producto.save();
        res.status(201).json({ msg: 'Producto creado exitosamente', producto });
    } catch (error) {
        console.error('Error al crear producto:', error.message);
        res.status(500).send('Hubo un error al crear el producto');
    }
};

// Incrementar el contador (si es necesario)
exports.incrementarContador = async (_req, res) => {
    try {
        // Lógica para incrementar el contador (si es necesario)
        // ...
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al incrementar el contador');
    }
};


// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, vendedor, rut, telefono, abono, saldo, fecha, observacion, tipoPago, tablas } = req.body;

        // Validar campos requeridos en las tablas
        const { isValid, field, message } = validateTablas(tablas);
        if (!isValid) {
            return res.status(400).json({ msg: message });
        }

        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        // Actualizar los campos del producto
        producto.nombre = nombre;
        producto.vendedor = vendedor;
        producto.rut = rut;
        producto.telefono = telefono;
        producto.abono = abono;
        producto.saldo = saldo;
        producto.fecha = fecha;
        producto.observacion = observacion;
        producto.tipoPago = tipoPago;
        producto.tablas = tablas; // Asignamos directamente las tablas

        await producto.save();
        res.json({ msg: 'Producto actualizado exitosamente', producto });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (_req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener un producto por ID
exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Eliminar un producto por ID
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        await Producto.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener datos para el gráfico
exports.obtenerDatosGrafico = async (req, res) => {
    try {
        const productos = await Producto.find({}, 'fecha precio'); // Sin coma en el segundo argumento

        const datosGrafico = productos.map(producto => ({
            fecha: producto.fecha,
            precio: producto.precio
        }));

        res.json(datosGrafico);
    } catch (error) {
        console.error('Error al obtener los datos del gráfico: ', error.message);
        res.status(500).send('Hubo un error al obtener los datos del gráfico');
    }
      
};


exports.agregarProducto= async (req, res) => {
    try {
      // Obtener el número de secuencia para el producto
      const numeroSecuencial = await getNextSequenceValue('producto');
  
      // Crear un nuevo objeto Producto con los datos del cuerpo de la solicitud
      const nuevoProducto = new Producto({
        ...req.body,
        numeroSecuencial  // Asignamos el número de secuencia obtenido
      });
  
      // Guardar el nuevo producto en la base de datos
      await nuevoProducto.save();
  
      // Responder con éxito y devolver el producto creado
      res.status(201).json({ message: 'Producto registrado con éxito', producto: nuevoProducto });
    } catch (error) {
      // Manejar errores y responder con un mensaje de error
      console.error('Error al guardar producto:', error);
      res.status(500).json({ message: 'Hubo un error al guardar el producto', error });
    }
  };
  
 