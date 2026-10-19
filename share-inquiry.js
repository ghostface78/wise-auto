const inquiryShareLink = document.querySelector('[data-share-inquiry]');

if (inquiryShareLink) {
  const inquiryUrl = new URL('interest.html', window.location.href).href;
  const shareTitle = 'Wise Auto Group vehicle inquiry';
  const shareText = 'Tell us what vehicle you are looking for:';
  const smsBody = `${shareText} ${inquiryUrl}`;

  inquiryShareLink.href = `sms:?&body=${encodeURIComponent(smsBody)}`;

  inquiryShareLink.addEventListener('click', async (event) => {
    if (!navigator.share) return;

    event.preventDefault();

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: inquiryUrl,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      console.error('Unable to open the share menu.', error);
      window.location.href = inquiryShareLink.href;
    }
  });
}
