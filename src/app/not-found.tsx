
export default function NotFound() {
  return (
      <>
        <div className="bg-white dark:bg-gray-900" style={{
          fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <h1 style={{
              display: 'inline-block',
              margin: '0 20px 0 0',
              padding: '0 23px 0 0',
              fontSize: '24px',
              fontWeight: 500,
              verticalAlign: 'top',
              lineHeight: '49px',
              borderRight: '1px solid rgba(0, 0, 0, .3)',
              color: '#000'
            }} className="dark:!text-white dark:!border-r-white/30">
              404
            </h1>
            <div style={{ display: 'inline-block' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '49px',
                margin: 0,
                color: '#000'
              }} className="dark:!text-white">
                This page could not be found.
              </h2>
            </div>
          </div>
        </div>
      </>
    );
  }

