// swalUtils.ts
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2'

const SwalMixin = Swal.mixin({
  cancelButtonText: 'Cancelar',
  customClass: {
    confirmButton:
      'px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-2 focus:outline-none text-white font-semibold rounded', // botón principal azul
    cancelButton:
      'px-4 py-2 me-5 bg-gray-300 hover:bg-gray-400 focus:ring-gray-400 focus:ring-2 focus:outline-none text-gray-800 font-semibold rounded', // botón secundario gris
  },
//   buttonsStyling: false,
})

/**
 * Toast rápido con SweetAlert2
 */
export const SwalToast = (...args: Parameters<typeof Swal.fire>): Promise<SweetAlertResult> => {
  return SwalMixin.mixin({
    icon: 'success',
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  }).fire(...args)
}

/**
 * Mensaje de éxito genérico
 */
export const SwalSuccess = (
  title?: string | null,
  message?: string | null,
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | null,
  options?: SweetAlertOptions
): Promise<SweetAlertResult> => {
  const getString = (item: any): string | false => (typeof item === 'string' ? item : false)

  let swalOptions: SweetAlertOptions = {
    title: getString(title) || '¡Listo!',
    html: getString(message) ? `<div class="text-center">${message}</div>` : undefined,
    icon: getString(icon) || 'success',
    ...options,
  }

  return SwalMixin.fire(swalOptions)
}

/**
 * Confirmación genérica
 */
export const SwalConfirm = (
  verbo?: string | null,
  sujeto?: string | null,
  detalles?: string | null,
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | null,
  options?: SweetAlertOptions
): Promise<SweetAlertResult> => {
  const getString = (item: any): string | false => (typeof item === 'string' ? item : false)

  let html = ''
  verbo = getString(verbo)
  sujeto = getString(sujeto)
  detalles = getString(detalles)

  if (sujeto && sujeto.startsWith('<')) {
    html = sujeto
  } else if (verbo) {
    sujeto = sujeto || 'este elemento'
    detalles = detalles || '¿Seguro de continuar?'
    html = `<p>Estás a punto de <b>${verbo} ${sujeto}</b>.<br />${detalles}</p>`
  } else {
    verbo = 'continuar'
  }

  const swalOptions: SweetAlertOptions = {
    icon: icon || 'warning',
    showCancelButton: true,
    reverseButtons: true,
    title: `¿Estás seguro de ${verbo}?`,
    html,
    confirmButtonText: `Sí, ${verbo}!`,
    ...options,
  }

  return SwalMixin.fire(swalOptions)
}

/**
 * Mensaje de error genérico
 */
export const SwalError = (
  verbo?: string | Record<string, any> | null,
  sujeto?: string | null,
  detalles?: string | null,
  error?: Error | null,
  options?: SweetAlertOptions
): Promise<SweetAlertResult | void> => {
  const getString = (item: any): string | false => (typeof item === 'string' ? item : false)

  if (verbo && typeof verbo === 'object' && 'message' in verbo) {
    if ((verbo as any).handled) {
      return Promise.resolve()
    }
    error = verbo as Error
    verbo = undefined
  }

  let title = 'No se completó la solicitud'
  let html = `<p class="small text-muted">Inténtalo de nuevo por favor. Si el problema persiste, toma una captura de pantalla de este mensaje y <i class="fas fa-headset"></i> comunícate con Nosotros.</p>`

  if (getString(verbo) && getString(sujeto)) {
    title = `No se pudo ${verbo}!`
    sujeto = sujeto || 'el elemento'
    html = `<p>Ha sucedido un problema al <br><b>${verbo} ${sujeto}</b>.</p>`
  } else if (getString(verbo)) {
    html = verbo.startsWith('<') ? verbo : `<p>${verbo}</p>`
  }

  if (detalles) html += `<br />${detalles}`
  else if (detalles && (detalles as any).code || (detalles as any).message) error = detalles as Error

  if (error) {
    const msgValido = (error as any).statusCode === 409 || (error as any).statusCode === 422
    if (!msgValido) {
      html += `<p class="text-primary" style="line-height: 1.2"><small>${error.message}</small><br></p>`
    } else {
      html = `<p class="text-primary" style="line-height: 1.2">${error.message}</p>`
    }
    if ((error as any).code) {
      html += `<p><small style="float:right;color:#dbe0e6!important"><b>${(error as any).code}</b></small></p>`
    }
    if ((error as any).title) {
      title = (error as any).title
    }
  }

  const swalOptions: SweetAlertOptions = {
    icon: 'error',
    title,
    html,
    confirmButtonText: `Aceptar`,
    customClass: {
      confirmButton:
        'px-4 py-2 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-2 focus:outline-none text-white font-semibold rounded', // botón peligro rojo
    },
    ...options,
  }

  return SwalMixin.fire(swalOptions)
}

/**
 * Mensaje de error genérico extendido
 * Incluye manejo especial para sesión expirada o token mismatch (419)
 */
export const SwalError2 = (
  error: any,
  title = 'Error al actualizar',
  options?: SweetAlertOptions
): Promise<SweetAlertResult> => {
  const status = error?.response?.status
  const message = error?.response?.data?.message?.toLowerCase?.() || ''

  const isSessionExpired =
    status === 401 ||
    status === 419 ||
    message.includes('token') ||
    message.includes('unauthenticated') ||
    message.includes('mismatch')

  const finalTitle = isSessionExpired ? 'Sesión expirada' : title
  const finalMessage = isSessionExpired
    ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
    : error.message || 'Hubo un problema'

  const detailMessage = isSessionExpired
    ? ''
    : error.response?.data?.message || 'Ocurrió un error'

  const html = `
    <div>${finalMessage}</div>
    ${detailMessage ? `<div class="mt-3 text-sm text-gray-600">${detailMessage}</div>` : ''}
  `

  const swalOptions: SweetAlertOptions = {
    title: finalTitle,
    html,
    icon: 'error',
    confirmButtonText: isSessionExpired ? 'Iniciar sesión' : 'Aceptar',
    customClass: {
      confirmButton:
        'px-4 py-2 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-2 focus:outline-none text-white font-semibold rounded',
    },
    ...options,
  }

  return SwalMixin.fire(swalOptions).then((result) => {
    if (isSessionExpired && result.isConfirmed) {
      // Redirigir al login (ajusta según tu ruta)
      window.location.href = '/login'
    }
    return result
  })
}



export default SwalMixin
