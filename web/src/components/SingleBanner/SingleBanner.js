import { navigate } from '@redwoodjs/router'

const SingleBanner = ({ banner }) => {
  return (
    <div
      className="w-full relative bg-fixed bg-no-repeat bg-center bg-cover flex flex-col py-24 px-12 justify-around mb-4"
      style={{
        backgroundImage: `url(${banner?.backgroundUrl})`,
        height: '50vh',
      }}
    >
      <div
        id="text"
        className="justify-between flex flex-col"
        style={{
          alignSelf: banner?.textPlacement,
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: banner?.mainTextColor,
            fontSize: `${banner?.mainTextFontSize}px`,
            textAlign: 'center',
          }}
        >
          {banner?.mainText}
        </h1>
        <h3
          style={{
            color: banner?.subTextColor,
            fontSize: `${banner?.subTextFontSize}px`,
            textAlign: 'center',
          }}
        >
          {banner?.subText}
        </h3>
      </div>
      <div
        id="buttons"
        className="justify-around w-full mt-1 sm:w-1/3 flex"
        style={{
          alignSelf: banner?.buttonsVerticalPlacement,
          justifySelf: banner?.buttonsHorizontalPlacement,
        }}
      >
        {banner?.button1Text && (
          <button
            className="px-4 py-2 rounded-md"
            onClick={() => navigate(banner?.button1Link)}
            style={{
              backgroundColor: banner?.button1BackgroundColor,
              color: banner?.button1TextColor,
              fontSize: banner?.buttonsFontSize,
            }}
          >
            {banner?.button1Text}
          </button>
        )}
        {banner?.button2Text && (
          <button
            className="px-4 py-2 rounded-md"
            onClick={() => navigate(banner?.button2Link)}
            style={{
              backgroundColor: banner?.button2BackgroundColor,
              color: banner?.button2TextColor,
              fontSize: banner?.buttonsFontSize,
            }}
          >
            {banner?.button2Text}
          </button>
        )}
      </div>
    </div>
  )
}

export default SingleBanner
