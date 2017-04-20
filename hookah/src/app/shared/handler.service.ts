import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class Handler {

    private subject = new Subject();

    public onMessage = this.subject.asObservable();

    public showMessage(msg: string) {
        this.subject.next(msg);
    }

}
