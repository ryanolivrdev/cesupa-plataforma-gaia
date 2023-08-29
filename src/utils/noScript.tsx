/* eslint-disable @next/next/no-head-element */
export function NoScript() {
  return (
    <>
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .noscript {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background-color: white;
              }
            `,
          }}
        />
        <div className="noscript">
          <h1>401</h1>
          <h1>Unauthorized Access</h1>
          <p>Please enable javascript to access this page</p>
        </div>
      </noscript>
    </>
  );
}
