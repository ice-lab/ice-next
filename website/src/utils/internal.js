const privateURL = `https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/rmsportal/VmvVUItLdPNqKlNGuRHi.png?r=${Date.now()}`;
const EVENT_NAME = 'check:internal';
let pending = false;

export function isInternal() {
  if (pending === false) {
    pending = true;
    return new Promise((resolve) => {
      const img = document.createElement('img');
      img.onload = () => {
        resolve();
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
        pending = false;
      };
      setTimeout(() => {
        // Delay 1s to check.
        img.src = privateURL;
      }, 1000);
    });
  } else {
    return new Promise((resolve) => {
      window.addEventListener(EVENT_NAME, () => {
        resolve();
      });
    });
  }
}
