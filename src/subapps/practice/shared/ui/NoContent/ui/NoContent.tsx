import RelLink from "@/shared/components/RelLink"
import { CustomButton, Title } from "@agaspher/apply.ui-kit"
import { IonIcon } from "@ionic/react"
import { footstepsOutline } from "ionicons/icons"

interface NoContentProps {
    title: string;
    buttonText: string;
    link: string
}

const NoContent: React.FC<NoContentProps> = ({ buttonText, link, title }) => {
    return <div>
        <div className="flex justify-center">
            <IonIcon icon={footstepsOutline} className="w-1/2 h-1/2  aspect-square" />
        </div>
        <Title className="text-center text-balance text-2xl my-8 font-normal">{title}</Title>
        <RelLink className="" to={link}>
            <CustomButton className="w-full">{buttonText}</CustomButton>
        </RelLink>
    </div>
}

export default NoContent