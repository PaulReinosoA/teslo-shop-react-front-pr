import { Link } from 'react-router';

interface Props {
  subtitle?: string;
}

export const CustomLogo = ({ subtitle = 'Shop' }: Props) => {
  return (
    <div>
      <Link to="/" className="flex items-center white-space-nowrap">
        <span className="font-montserrat font-bold text-xl m0 white-space-nowrap">
          teslo |
        </span>

        <p className="font-muted-foreground m-0 px-2 white-space-nowrap">
          {subtitle}
        </p>
      </Link>
    </div>
  );
};
