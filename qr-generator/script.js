const qrText = document.getElementById('qrText')
const sizes = document.getElementById('sizes')
const downloadBtn = document.getElementById('downloadBtn')
const generateBtn = document.getElementById('generateBtn')

const qrBody = document.querySelector('.qr-body')

generateBtn.addEventListener('click', (e) => {
  e.preventDefault()
  qrText.value.length > 0
    ? generateQRCode()
    : alert('Type your text or Enter URL to generate code')
})
sizes.addEventListener('change', (e) => {
  size = e.target.value
})

let size = sizes.value

function generateQRCode() {
  qrBody.innerHTML = ''
  // get the following code from a library via https://davidshimjs.github.io/qrcodejs/
  new QRCode(qrBody, {
    text: qrText.value,
    height: size,
    width: size,
    colorLight: '#ffffff',
    colorDark: '#000000'
  })
}
downloadBtn.addEventListener('click', () => {
  let img = document.querySelector('.qr-body img')

  if (img !== null) {
    let imgAttribute = img.getAttribute('src')
    downloadBtn.setAttribute('href', imgAttribute)
  } else {
    downloadBtn.setAttribute(
      'href',
      `${document.querySelector('canvas'.toDataURL())}`
    )
  }
})
