<template>

	<Head>
		<Title>HW Tracker | Beta</Title>
		<Meta name="description" content="สมุดจดการบ้านของห้อง 6/1" />
		<Meta name="twitter:title" content="HW Tracker | Beta" />
		<Meta name="og:type" content="website" />
		<Meta name="og:title" content="HW Tracker | Beta" />
		<Meta name="og:description" content="สมุดจดการบ้านของห้อง 6/1" />
		<Meta name="og:image" content="/social_image.jpg" />
		<Meta name="twitter:description" content="สมุดจดการบ้านของห้อง 6/1" />
		<Meta name="twitter:image" content="/social_image.jpg" />
	</Head>
	<!-- <div class="min-h-screen bg-[#1A202C]"> -->
	<div class="min-h-screen bg-slate-900">
		<header class="sticky top-0 backdrop-blur-md">
			<TheNav></TheNav>
		</header>
		<slot />
	</div>
</template>

<style>
/* @font-face {
    font-family: 'THSarabunNew';
    src: url('thsarabunnew_bolditalic-webfont.eot');
    src: url('thsarabunnew_bolditalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('thsarabunnew_bolditalic-webfont.woff') format('woff'),
         url('thsarabunnew_bolditalic-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;

}

@font-face {
    font-family: 'THSarabunNew';
    src: url('thsarabunnew_italic-webfont.eot');
    src: url('thsarabunnew_italic-webfont.eot?#iefix') format('embedded-opentype'),
         url('thsarabunnew_italic-webfont.woff') format('woff'),
         url('thsarabunnew_italic-webfont.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;

} */

/*@font-face {
	 font-family: 'THSarabunNew';
	src: url('thsarabunnew_bold-webfont.eot');
	src: url('thsarabunnew_bold-webfont.eot?#iefix') format('embedded-opentype'),
		url('thsarabunnew_bold-webfont.woff') format('woff'),
		url('thsarabunnew_bold-webfont.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;

} */
</style>