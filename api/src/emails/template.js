const emailTemplate1 = (html) => `
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-class name="header" color="#111827;" font-size="22px" font-weight="500" padding-bottom="20px"/>
        <mj-class name="body" color="#111827;" font-size="16px" font-weight="500" />
        <mj-all font-family="Arial" />
      </mj-attributes>
    </mj-head>
    <mj-body>
      <mj-wrapper padding-top="40px" full-width >
          <mj-section full-width background-color="#F4F5F7">
            ${html}
          </mj-section>
      </mj-wrapper>
    </mj-body>
  </mjml>
`

export default emailTemplate1
