import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useTranslation } from "react-i18next";

function CreateTicketDialog ( {isFetching}: {isFetching: boolean}) {
    const { t } = useTranslation();

    return(
        <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" disabled={isFetching} variant="default">
                 {t("ticket.createticket")} 
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                {t("ticket.dialogtitle")} 
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {t("ticket.dialog1")} 
                <br />
                {t("ticket.dialog2")} 
                <br />
                {t("ticket.dialog3")} 
                <br />
                {t("ticket.dialog4")}
                <br />
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">{t("ticket.dialogcancel")} </Button>
                </DialogClose>
                <Link to="/create-ticket">
                  <Button>{t("ticket.dialogconfirm")} </Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    )
}

export default CreateTicketDialog;
