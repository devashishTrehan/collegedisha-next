
import { SubscribeSection } from '@/Components/Subscribe.component';
import * as React from 'react';
import { Footer } from '@/Components/Footer.component';
import { ContentCards, Header, CounsellingFormSection, FeaturesSection } from '@/Components/HomeSections';
import { AlertBox } from '@/Components/AlertBox.component';
import { SetCookie, Storages } from '@/Services/App.service';



function Home(props: any) {


  React.useEffect(() => {
    SetCookie(Storages.UserId, 5, 5);
    SetCookie(Storages.AccessToken, 'abcdefghidef7648hvy45t98vn-4vy-n56im0u3cukgjkvwt67yndt', 5);
  }, [])


  return (

    <>
      {/* <NavBar home={true} /> */}

      <Header />
      <ContentCards />
      <CounsellingFormSection />
      <FeaturesSection />
      <SubscribeSection />
      {/* <StatSection /> */}

      <Footer />

    </>

  );
}

export default Home;
