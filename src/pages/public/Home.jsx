import Seo from "../../components/common/Seo";
import HeroSection from "../../components/home/HeroSection";
import FeaturedJobs from "../../components/home/FeaturedJobs";
import PopularCategories from "../../components/home/PopularCategories";
import WhyJoblessJob from "../../components/home/WhyJoblessJob";
import CTASection from "../../components/home/CTASection";
import AdSlot from "../../components/common/AdSlot";

const Home = () => <>
  <Seo title="Find Your Next Job" description="Discover relevant job opportunities, explore companies and apply directly to roles that match your skills with JoblessJob." path="/" />
  <HeroSection />
  <FeaturedJobs />
  <section className="bg-[#0d0d0a] py-4"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><AdSlot slot="YOUR_AD_SLOT_ID" className="w-full" label="Advertisement" fallbackTitle="Get fresh job updates" fallbackDescription="Stay close to new opportunities from JoblessJob." fallbackButton="Explore jobs" fallbackUrl="/find-job" /></div></section>
  <PopularCategories />
  <WhyJoblessJob />
  <CTASection />
</>;

export default Home;
