export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const number = num => (num > 9 ? "" + num : "0" + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + " ngày trước";
      } else {
        const months = [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} giờ trước`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} phút trước`;
    }
    return "vài giây trước";
  };
  return getTime();
}

export function compress(file, options = {}) {
  return new Promise(function(resolve, reject) {
    let mime_type = "image/jpeg";
    if (options.output_format === "png") {
      mime_type = "image/png";
    }
    const maxWidth = options.maxWidth || 1920;
    const maxHeight = options.maxHeight || 1080;

    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        let natW = img.width;
        let natH = img.height;
        const ratio = natH / natW;
        if (img.width > maxWidth) {
          natW = maxWidth;
          natH = ratio * maxWidth;
        }
        if (img.height > maxHeight) {
          natH = maxHeight;
          natW = maxHeight / ratio;
        }
        elem.height = natH;
        elem.width = natW;
        const ctx = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, natW, natH);
        ctx.canvas.toBlob(
          blob => {
            const new_file = new File([blob], fileName, {
              type: mime_type,
              lastModified: Date.now()
            });
            resolve(new_file);
          },
          mime_type,
          typeof options.quality === "undefined" ? 1 : options.quality
        );
      };
      reader.onerror = error => {
        reject(error);
      };
    };
  });
}