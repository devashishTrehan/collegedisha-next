
import { SubscribeSection } from '@/Components/Subscribe.component';
import * as React from 'react';
import { Footer } from '@/Components/Footer.component';
import { ContentCards, Header, CounsellingFormSection, FeaturesSection } from '@/Components/HomeSections';



function Home(props: any) {


  React.useEffect(() => {
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
