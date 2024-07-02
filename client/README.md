# HP - 행복한 약국 평점 사이트

## 📖프로젝트 설명

## 📦 폴더 구조


```
client
├─ src
│  ├─ (FSD)
│  │  ├─ apps
│  │  │  └─ providers
│  │  │     ├─ MapProvider.tsx
│  │  │     ├─ QueryProvider.tsx
│  │  │     ├─ RootProvider.tsx
│  │  │     └─ UiProvider.tsx
│  │  ├─ entities
│  │  │  ├─ pharmacy
│  │  │  │  ├─ api
│  │  │  │  │  ├─ usePharmacyAllSearch.ts
│  │  │  │  │  ├─ usePharmacyKeywordMap.ts
│  │  │  │  │  ├─ usePharmacyKeywordSearch.ts
│  │  │  │  │  ├─ usePharmacyNearMap.ts
│  │  │  │  │  ├─ usePharmacyNearSearch.ts
│  │  │  │  │  ├─ usePharmacyRankEnjoyListRead.ts
│  │  │  │  │  ├─ usePharmacyRankStarListRead.ts
│  │  │  │  │  ├─ usePharmacyRead.ts
│  │  │  │  │  ├─ usePharmacyRegionKeywordMap.ts
│  │  │  │  │  ├─ usePharmacyRegionKeywordSearch.ts
│  │  │  │  │  ├─ usePharmacyRegionMap.ts
│  │  │  │  │  └─ usePharmacyRegionSearch.ts
│  │  │  │  └─ ui
│  │  │  │     ├─ PharmacyAllList.tsx
│  │  │  │     ├─ PharmacyInfoContainer.tsx
│  │  │  │     ├─ PharmacyKeywordList.tsx
│  │  │  │     ├─ PharmacyKeywordMap.tsx
│  │  │  │     ├─ PharmacyNearList.tsx
│  │  │  │     ├─ PharmacyNearMap.tsx
│  │  │  │     ├─ PharmacyRankEnjoyList.tsx
│  │  │  │     ├─ PharmacyRankStarList.tsx
│  │  │  │     ├─ PharmacyRegionKeywordList.tsx
│  │  │  │     ├─ PharmacyRegionKeywordMap.tsx
│  │  │  │     ├─ PharmacyRegionList.tsx
│  │  │  │     └─ PharmacyRegionMap.tsx
│  │  │  ├─ reply
│  │  │  │  ├─ api
│  │  │  │  │  ├─ useReplyListRead.ts
│  │  │  │  │  └─ useReplyRead.ts
│  │  │  │  └─ ui
│  │  │  │     └─ ReplyContainer.tsx
│  │  │  ├─ review
│  │  │  │  ├─ api
│  │  │  │  │  ├─ useReviewListRead.ts
│  │  │  │  │  └─ useReviewRead.ts
│  │  │  │  └─ ui
│  │  │  │     └─ ReviewContaner.tsx
│  │  │  └─ user
│  │  │     └─ api
│  │  │        ├─ useUserRead.ts
│  │  │        ├─ useUserReplyListRead.ts
│  │  │        └─ useUserReviewListRead.ts
│  │  ├─ features
│  │  │  ├─ auth
│  │  │  │  ├─ api
│  │  │  │  │  ├─ useAuthSIgnin.ts
│  │  │  │  │  └─ useAuthSignup.ts
│  │  │  │  └─ ui
│  │  │  │     ├─ AuthSigninForm.tsx
│  │  │  │     └─ AuthSignupForm.tsx
│  │  │  ├─ pharmacy
│  │  │  │  ├─ api
│  │  │  │  │  └─ usePharmacyEnjoyToggle.ts
│  │  │  │  ├─ consts
│  │  │  │  │  └─ cityList.ts
│  │  │  │  └─ ui
│  │  │  │     ├─ PharmacyEnjoyBtn.tsx
│  │  │  │     ├─ PharmacyKeywordForm.tsx
│  │  │  │     ├─ PharmacyRegionBar.tsx
│  │  │  │     └─ PharmacyRegionKeywordForm.tsx
│  │  │  ├─ reply
│  │  │  │  ├─ api
│  │  │  │  │  ├─ useReplyCreate.ts
│  │  │  │  │  ├─ useReplyDelete.ts
│  │  │  │  │  └─ useReplyUpdate.ts
│  │  │  │  └─ ui
│  │  │  │     ├─ ReplyCreateForm.tsx
│  │  │  │     └─ ReplyUpdateForm.tsx
│  │  │  ├─ review
│  │  │  │  ├─ api
│  │  │  │  │  ├─ useReviewCreate.ts
│  │  │  │  │  ├─ useReviewDelete.ts
│  │  │  │  │  └─ useReviewUpdate.ts
│  │  │  │  └─ ui
│  │  │  │     ├─ ReviewCreateForm.tsx
│  │  │  │     └─ ReviewUpdateForm.tsx
│  │  │  ├─ types
│  │  │  │  └─ mutation.type.ts
│  │  │  └─ user
│  │  │     ├─ api
│  │  │     │  └─ useUserLogout.ts
│  │  │     └─ ui
│  │  │        └─ UserLogoutButton.tsx
│  │  ├─ shareds
│  │  │  ├─ fetch
│  │  │  │  └─ fetchData.ts
│  │  │  ├─ stores
│  │  │  │  └─ useUserStore.ts
│  │  │  ├─ styles
│  │  │  │  ├─ AppStyle.module.scss
│  │  │  │  ├─ AuthStyle.module.scss
│  │  │  │  ├─ ComponentStyle.module.scss
│  │  │  │  ├─ Pharmacy.module.scss
│  │  │  │  ├─ ReplyStyle.module.scss
│  │  │  │  ├─ ReviewStyle.module.scss
│  │  │  │  ├─ SkeletonStyle.module.scss
│  │  │  │  ├─ globalStyle.scss
│  │  │  │  ├─ root.scss
│  │  │  │  └─ theme.scss
│  │  │  ├─ types
│  │  │  │  ├─ Error.type.ts
│  │  │  │  ├─ FetchData.type.ts
│  │  │  │  ├─ FileInput.type.ts
│  │  │  │  ├─ Form.type.ts
│  │  │  │  ├─ FormInput.type.ts
│  │  │  │  ├─ FormTextarea.type.ts
│  │  │  │  ├─ Icon.type.ts
│  │  │  │  ├─ LinkBtn.type.ts
│  │  │  │  ├─ Map.type.ts
│  │  │  │  ├─ MenuBar.type.ts
│  │  │  │  ├─ Modal.type.ts
│  │  │  │  ├─ PharmacyMap.type.ts
│  │  │  │  ├─ Reply.type.ts
│  │  │  │  ├─ Review.type.ts
│  │  │  │  ├─ User.type.ts
│  │  │  │  └─ pharmacys
│  │  │  │     ├─ Pharmacy.type.ts
│  │  │  │     └─ PharmacyInfo.type.ts
│  │  │  └─ ui
│  │  │     ├─ BackBtnShared.tsx
│  │  │     ├─ ContainerShared.tsx
│  │  │     ├─ FileInputShared.tsx
│  │  │     ├─ FooterShared.tsx
│  │  │     ├─ FormInputShared.tsx
│  │  │     ├─ FormTextareaShared.tsx
│  │  │     ├─ HeaderShared.tsx
│  │  │     ├─ IconShared.tsx
│  │  │     ├─ InnerShared.tsx
│  │  │     ├─ ItemShared.tsx
│  │  │     ├─ LinkBtnShared.tsx
│  │  │     ├─ LogoShared.tsx
│  │  │     ├─ MapShared.tsx
│  │  │     ├─ MenuBarShared.tsx
│  │  │     ├─ ModalShared.tsx
│  │  │     ├─ PasswordInputShared.tsx
│  │  │     ├─ PharmacyMapShared.tsx
│  │  │     ├─ PharmacyShared.tsx
│  │  │     ├─ PharmacySkeletonShared.tsx
│  │  │     ├─ ReplyShared.tsx
│  │  │     ├─ ReviewShared.tsx
│  │  │     ├─ SectionShared.tsx
│  │  │     ├─ StarListShared.tsx
│  │  │     ├─ StarShared.tsx
│  │  │     ├─ TextBoxShared.tsx
│  │  │     ├─ TextLargeShared.tsx
│  │  │     ├─ TextMediumShared.tsx
│  │  │     ├─ TextSmallShared.tsx
│  │  │     └─ TextXLargeShared.tsx
│  │  └─ widgets
│  │     ├─ app
│  │     │  └─ ui
│  │     │     ├─ AppFooter.tsx
│  │     │     ├─ AppHeader.tsx
│  │     │     ├─ Error.tsx
│  │     │     ├─ Loading.tsx
│  │     │     └─ TitleHeader.tsx
│  │     ├─ pharmacy
│  │     │  ├─ types
│  │     │  │  └─ PharmacyInfoModal.type.ts
│  │     │  └─ ui
│  │     │     ├─ PharmacyInfo.tsx
│  │     │     ├─ PharmacyInfoModal.tsx
│  │     │     └─ PharmacyNearContainer.tsx
│  │     ├─ reply
│  │     │  └─ ui
│  │     │     └─ ReplyHeader.tsx
│  │     └─ review
│  │        └─ ui
│  │           └─ ReviewHeader.tsx
│  └─ app
│     ├─ (app)
│     │  ├─ (private)
│     │  │  └─ profile
│     │  │     └─ page.tsx
│     │  ├─ (public)
│     │  │  ├─ (common)
│     │  │  │  ├─ layout.tsx
│     │  │  │  ├─ pharmacy
│     │  │  │  │  ├─ not-found.tsx
│     │  │  │  │  └─ page.tsx
│     │  │  │  ├─ reply
│     │  │  │  │  ├─ create
│     │  │  │  │  │  └─ [reviewId]
│     │  │  │  │  │     └─ page.tsx
│     │  │  │  │  └─ update
│     │  │  │  │     └─ page.tsx
│     │  │  │  └─ review
│     │  │  │     ├─ create
│     │  │  │     │  └─ page.tsx
│     │  │  │     ├─ page.tsx
│     │  │  │     └─ update
│     │  │  │        └─ page.tsx
│     │  │  └─ map
│     │  │     ├─ all
│     │  │     │  └─ page.tsx
│     │  │     ├─ near
│     │  │     │  └─ page.tsx
│     │  │     ├─ not-found.tsx
│     │  │     ├─ region
│     │  │     │  ├─ page.tsx
│     │  │     │  └─ search
│     │  │     │     └─ page.tsx
│     │  │     └─ search
│     │  │        └─ page.tsx
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ auth
│     │  ├─ signin
│     │  │  └─ page.tsx
│     │  └─ signup
│     │     └─ page.tsx
│     ├─ layout.tsx
│     └─ not-found.tsx
├─ tailwind.config.js
└─ tsconfig.json
```