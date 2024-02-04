import Svg, { Defs, Path, G } from 'react-native-svg'

export const Gear = () => (
  <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <G filter="url(#filter0_d_216_21)">
      <rect x="2" y="1" width="52" height="52" rx="26" fill="#3B82F6" />
      <rect x="5" y="4" width="46" height="46" rx="23" stroke="#BFDBFE" strokeWidth="6" />
    </G>
    <Path
      opacity="0.12"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.6236 30.6005C34.5702 30.3056 34.6063 30.0015 34.7273 29.7273C34.8425 29.4584 35.0339 29.2291 35.2778 29.0676C35.5217 28.906 35.8075 28.8193 36.1 28.8182H36.1818C36.664 28.8182 37.1265 28.6266 37.4675 28.2856C37.8084 27.9447 38 27.4822 38 27C38 26.5178 37.8084 26.0553 37.4675 25.7144C37.1265 25.3734 36.664 25.1818 36.1818 25.1818H36.0273C35.7347 25.1807 35.4489 25.094 35.205 24.9324C34.9611 24.7709 34.7698 24.5416 34.6545 24.2727V24.2C34.5335 23.9258 34.4974 23.6216 34.5509 23.3267C34.6044 23.0318 34.745 22.7597 34.9545 22.5455L35.0091 22.4909C35.1781 22.322 35.3122 22.1215 35.4037 21.9008C35.4952 21.6801 35.5423 21.4435 35.5423 21.2045C35.5423 20.9656 35.4952 20.729 35.4037 20.5083C35.3122 20.2876 35.1781 20.087 35.0091 19.9182C34.8402 19.7491 34.6397 19.615 34.419 19.5235C34.1983 19.432 33.9617 19.3849 33.7227 19.3849C33.4838 19.3849 33.2472 19.432 33.0265 19.5235C32.8057 19.615 32.6052 19.7491 32.4364 19.9182L32.3818 19.9727C32.1676 20.1823 31.8954 20.3229 31.6005 20.3764C31.3056 20.4298 31.0015 20.3937 30.7273 20.2727C30.4584 20.1575 30.2291 19.9661 30.0676 19.7222C29.906 19.4783 29.8193 19.1925 29.8182 18.9V18.8182C29.8182 18.336 29.6266 17.8735 29.2856 17.5325C28.9447 17.1916 28.4822 17 28 17C27.5178 17 27.0553 17.1916 26.7144 17.5325C26.3734 17.8735 26.1818 18.336 26.1818 18.8182V18.9727C26.1807 19.2653 26.094 19.5511 25.9324 19.795C25.7709 20.0389 25.5416 20.2302 25.2727 20.3455H25.2C24.9258 20.4665 24.6216 20.5026 24.3267 20.4491C24.0318 20.3956 23.7597 20.255 23.5455 20.0455L23.4909 19.9909C23.322 19.8219 23.1215 19.6878 22.9008 19.5963C22.6801 19.5048 22.4435 19.4577 22.2045 19.4577C21.9656 19.4577 21.729 19.5048 21.5083 19.5963C21.2876 19.6878 21.087 19.8219 20.9182 19.9909C20.7491 20.1598 20.615 20.3603 20.5235 20.581C20.432 20.8017 20.3849 21.0383 20.3849 21.2773C20.3849 21.5162 20.432 21.7528 20.5235 21.9735C20.615 22.1943 20.7491 22.3948 20.9182 22.5636L20.9727 22.6182C21.1823 22.8324 21.3229 23.1046 21.3764 23.3995C21.4298 23.6944 21.3937 23.9985 21.2727 24.2727C21.1688 24.5552 20.9824 24.7999 20.7375 24.975C20.4927 25.1501 20.2009 25.2475 19.9 25.2545H19.8182C19.336 25.2545 18.8735 25.4461 18.5325 25.7871C18.1916 26.1281 18 26.5905 18 27.0727C18 27.5549 18.1916 28.0174 18.5325 28.3584C18.8735 28.6994 19.336 28.8909 19.8182 28.8909H19.9727C20.2653 28.8921 20.5511 28.9788 20.795 29.1403C21.0389 29.3018 21.2302 29.5311 21.3455 29.8C21.4665 30.0742 21.5026 30.3784 21.4491 30.6733C21.3956 30.9682 21.255 31.2403 21.0455 31.4545L20.9909 31.5091C20.8219 31.678 20.6878 31.8785 20.5963 32.0992C20.5048 32.3199 20.4577 32.5565 20.4577 32.7955C20.4577 33.0344 20.5048 33.271 20.5963 33.4917C20.6878 33.7124 20.8219 33.913 20.9909 34.0818C21.1598 34.2509 21.3603 34.385 21.581 34.4765C21.8017 34.568 22.0383 34.6151 22.2773 34.6151C22.5162 34.6151 22.7528 34.568 22.9735 34.4765C23.1943 34.385 23.3948 34.2509 23.5636 34.0818L23.6182 34.0273C23.8324 33.8177 24.1046 33.6771 24.3995 33.6236C24.6944 33.5702 24.9985 33.6063 25.2727 33.7273C25.5552 33.8312 25.7999 34.0176 25.975 34.2625C26.1501 34.5073 26.2475 34.7991 26.2545 35.1V35.1818C26.2545 35.664 26.4461 36.1265 26.7871 36.4675C27.1281 36.8084 27.5905 37 28.0727 37C28.5549 37 29.0174 36.8084 29.3584 36.4675C29.6994 36.1265 29.8909 35.664 29.8909 35.1818V35.0273C29.8921 34.7347 29.9788 34.4489 30.1403 34.205C30.3018 33.9611 30.5311 33.7698 30.8 33.6545C31.0742 33.5335 31.3784 33.4974 31.6733 33.5509C31.9682 33.6044 32.2403 33.745 32.4545 33.9545L32.5091 34.0091C32.678 34.1781 32.8785 34.3122 33.0992 34.4037C33.3199 34.4952 33.5565 34.5423 33.7955 34.5423C34.0344 34.5423 34.271 34.4952 34.4917 34.4037C34.7124 34.3122 34.913 34.1781 35.0818 34.0091C35.2509 33.8402 35.385 33.6397 35.4765 33.419C35.568 33.1983 35.6151 32.9617 35.6151 32.7227C35.6151 32.4838 35.568 32.2472 35.4765 32.0265C35.385 31.8057 35.2509 31.6052 35.0818 31.4364L35.0273 31.3818C34.8177 31.1676 34.6771 30.8954 34.6236 30.6005ZM31 27C31 28.6569 29.6569 30 28 30C26.3431 30 25 28.6569 25 27C25 25.3431 26.3431 24 28 24C29.6569 24 31 25.3431 31 27Z"
      fill="#DBEAFE"
    />
    <Path
      d="M28 30C29.6569 30 31 28.6569 31 27C31 25.3431 29.6569 24 28 24C26.3431 24 25 25.3431 25 27C25 28.6569 26.3431 30 28 30Z"
      stroke="#DBEAFE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M34.7273 29.7273C34.6063 30.0015 34.5702 30.3056 34.6236 30.6005C34.6771 30.8954 34.8177 31.1676 35.0273 31.3818L35.0818 31.4364C35.2509 31.6052 35.385 31.8057 35.4765 32.0265C35.568 32.2472 35.6151 32.4838 35.6151 32.7227C35.6151 32.9617 35.568 33.1983 35.4765 33.419C35.385 33.6397 35.2509 33.8402 35.0818 34.0091C34.913 34.1781 34.7124 34.3122 34.4917 34.4037C34.271 34.4952 34.0344 34.5423 33.7955 34.5423C33.5565 34.5423 33.3199 34.4952 33.0992 34.4037C32.8785 34.3122 32.678 34.1781 32.5091 34.0091L32.4545 33.9545C32.2403 33.745 31.9682 33.6044 31.6733 33.5509C31.3784 33.4974 31.0742 33.5335 30.8 33.6545C30.5311 33.7698 30.3018 33.9611 30.1403 34.205C29.9788 34.4489 29.8921 34.7347 29.8909 35.0273V35.1818C29.8909 35.664 29.6994 36.1265 29.3584 36.4675C29.0174 36.8084 28.5549 37 28.0727 37C27.5905 37 27.1281 36.8084 26.7871 36.4675C26.4461 36.1265 26.2545 35.664 26.2545 35.1818V35.1C26.2475 34.7991 26.1501 34.5073 25.975 34.2625C25.7999 34.0176 25.5552 33.8312 25.2727 33.7273C24.9985 33.6063 24.6944 33.5702 24.3995 33.6236C24.1046 33.6771 23.8324 33.8177 23.6182 34.0273L23.5636 34.0818C23.3948 34.2509 23.1943 34.385 22.9735 34.4765C22.7528 34.568 22.5162 34.6151 22.2773 34.6151C22.0383 34.6151 21.8017 34.568 21.581 34.4765C21.3603 34.385 21.1598 34.2509 20.9909 34.0818C20.8219 33.913 20.6878 33.7124 20.5963 33.4917C20.5048 33.271 20.4577 33.0344 20.4577 32.7955C20.4577 32.5565 20.5048 32.3199 20.5963 32.0992C20.6878 31.8785 20.8219 31.678 20.9909 31.5091L21.0455 31.4545C21.255 31.2403 21.3956 30.9682 21.4491 30.6733C21.5026 30.3784 21.4665 30.0742 21.3455 29.8C21.2302 29.5311 21.0389 29.3018 20.795 29.1403C20.5511 28.9788 20.2653 28.8921 19.9727 28.8909H19.8182C19.336 28.8909 18.8735 28.6994 18.5325 28.3584C18.1916 28.0174 18 27.5549 18 27.0727C18 26.5905 18.1916 26.1281 18.5325 25.7871C18.8735 25.4461 19.336 25.2545 19.8182 25.2545H19.9C20.2009 25.2475 20.4927 25.1501 20.7375 24.975C20.9824 24.7999 21.1688 24.5552 21.2727 24.2727C21.3937 23.9985 21.4298 23.6944 21.3764 23.3995C21.3229 23.1046 21.1823 22.8324 20.9727 22.6182L20.9182 22.5636C20.7491 22.3948 20.615 22.1943 20.5235 21.9735C20.432 21.7528 20.3849 21.5162 20.3849 21.2773C20.3849 21.0383 20.432 20.8017 20.5235 20.581C20.615 20.3603 20.7491 20.1598 20.9182 19.9909C21.087 19.8219 21.2876 19.6878 21.5083 19.5963C21.729 19.5048 21.9656 19.4577 22.2045 19.4577C22.4435 19.4577 22.6801 19.5048 22.9008 19.5963C23.1215 19.6878 23.322 19.8219 23.4909 19.9909L23.5455 20.0455C23.7597 20.255 24.0318 20.3956 24.3267 20.4491C24.6216 20.5026 24.9258 20.4665 25.2 20.3455H25.2727C25.5416 20.2302 25.7709 20.0389 25.9324 19.795C26.094 19.5511 26.1807 19.2653 26.1818 18.9727V18.8182C26.1818 18.336 26.3734 17.8735 26.7144 17.5325C27.0553 17.1916 27.5178 17 28 17C28.4822 17 28.9447 17.1916 29.2856 17.5325C29.6266 17.8735 29.8182 18.336 29.8182 18.8182V18.9C29.8193 19.1925 29.906 19.4783 30.0676 19.7222C30.2291 19.9661 30.4584 20.1575 30.7273 20.2727C31.0015 20.3937 31.3056 20.4298 31.6005 20.3764C31.8954 20.3229 32.1676 20.1823 32.3818 19.9727L32.4364 19.9182C32.6052 19.7491 32.8057 19.615 33.0265 19.5235C33.2472 19.432 33.4838 19.3849 33.7227 19.3849C33.9617 19.3849 34.1983 19.432 34.419 19.5235C34.6397 19.615 34.8402 19.7491 35.0091 19.9182C35.1781 20.087 35.3122 20.2876 35.4037 20.5083C35.4952 20.729 35.5423 20.9656 35.5423 21.2045C35.5423 21.4435 35.4952 21.6801 35.4037 21.9008C35.3122 22.1215 35.1781 22.322 35.0091 22.4909L34.9545 22.5455C34.745 22.7597 34.6044 23.0318 34.5509 23.3267C34.4974 23.6216 34.5335 23.9258 34.6545 24.2V24.2727C34.7698 24.5416 34.9611 24.7709 35.205 24.9324C35.4489 25.094 35.7347 25.1807 36.0273 25.1818H36.1818C36.664 25.1818 37.1265 25.3734 37.4675 25.7144C37.8084 26.0553 38 26.5178 38 27C38 27.4822 37.8084 27.9447 37.4675 28.2856C37.1265 28.6266 36.664 28.8182 36.1818 28.8182H36.1C35.8075 28.8193 35.5217 28.906 35.2778 29.0676C35.0339 29.2291 34.8425 29.4584 34.7273 29.7273Z"
      stroke="#DBEAFE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <filter
        id="filter0_d_216_21"
        x="0"
        y="0"
        width="56"
        height="56"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_216_21" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_216_21" result="shape" />
      </filter>
    </Defs>
  </Svg>
)